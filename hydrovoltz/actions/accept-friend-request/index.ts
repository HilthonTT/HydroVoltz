"use server";

import { revalidatePath } from "next/cache";

import { pusherServer } from "@/lib/pusher";
import { createSafeAction } from "@/lib/create-safe-action";
import { getSelf } from "@/lib/auth-service";
import { toPusherKey } from "@/lib/utils";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";

import { AcceptFriendRequest } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { id: requestId } = data;

  let friend;

  try {
    const request = await db.friendRequest.findUnique({
      where: {
        id: requestId,
        receiverId: self.id,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (request?.senderId === self.id) {
      return {
        error: "Cannot friend yourself",
      };
    }

    if (!request) {
      return {
        error: "Friend request not found",
      };
    }

    const selfKey = toPusherKey(`user:${self.id}:friends`);
    const otherKey = toPusherKey(`user:${request.sender.id}:friends`);

    const triggerFriendPromises = [
      pusherServer.trigger(otherKey, "new_friend", self),
      pusherServer.trigger(selfKey, "new_friend", request.receiver),
      db.friend.create({
        data: {
          initiatorId: request.senderId,
          friendId: request.receiverId,
        },
      }),
    ];

    await Promise.all(triggerFriendPromises);

    await db.friendRequest.update({
      where: {
        id: request?.id,
      },
      data: {
        status: "ACCEPTED",
      },
    });
  } catch (error) {
    return {
      error: "An error occurred while accepting the friend request",
    };
  }

  revalidatePath("/friends/pending");

  return { data: friend };
};

export const acceptFriendRequest = createSafeAction(
  AcceptFriendRequest,
  handler
);

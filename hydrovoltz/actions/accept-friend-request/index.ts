"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { getSelf } from "@/lib/auth-service";
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

  const { id } = data;

  if (id === self.id) {
    return {
      error: "Cannot friend yourself",
    };
  }

  let friend;

  try {
    const request = await db.friendRequest.findUnique({
      where: {
        id,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!request) {
      return {
        error: "Friend request not found",
      };
    }

    friend = await db.friend.create({
      data: {
        initiatorId: request.senderId,
        friendId: request.receiverId,
      },
    });

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

"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { isBlockedByUser } from "@/lib/block-service";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateFriendRequest } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { username } = data;

  const loweredUsername = username.toLowerCase();
  if (self.username === loweredUsername) {
    return {
      error: "Cannot send a friend request to yourself",
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        username: loweredUsername,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
      return {
        error: "You are currently blocked by this user",
      };
    }

    // Check if there's a pending request between the users
    const existingRequest = await db.friendRequest.findFirst({
      where: {
        senderId: self.id,
        receiverId: user.id,
        status: "PENDING",
      },
    });

    if (existingRequest) {
      return {
        error: "Friend request already sent and pending",
      };
    }

    const friendRequest = await db.friendRequest.create({
      data: {
        senderId: self.id,
        receiverId: user.id,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });

    const key = toPusherKey(`user:${user.id}:incoming_friend_requests`);
    await pusherServer.trigger(key, "incoming_friend_requests", friendRequest);

    revalidatePath("/friends");
    revalidatePath("/friends/added");

    return { data: friendRequest };
  } catch (error) {
    return {
      error: "Failed to send a friend request",
    };
  }
};

export const createFriendRequest = createSafeAction(
  CreateFriendRequest,
  handler
);

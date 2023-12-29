"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
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

    revalidatePath("/friends");
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

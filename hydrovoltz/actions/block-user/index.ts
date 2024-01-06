"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { blockUser as onBlockUser } from "@/lib/block-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

import { InputType, ReturnType } from "./types";
import { BlockUser } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { userId } = data;

  if (userId === self.id) {
    return {
      error: "Cannot block yourself",
    };
  }

  let blockedUser;
  try {
    const selfFriendChannel = toPusherKey(`user:${self.id}:friends`);
    const otherUserFriendChannel = toPusherKey(`user:${userId}:friends`);

    const blockPromises = [
      pusherServer.trigger(selfFriendChannel, `removed_friend`, {
        id: userId,
      }),
      pusherServer.trigger(otherUserFriendChannel, `removed_friend`, {
        id: self.id,
      }),
    ];

    await Promise.all(blockPromises);

    blockedUser = await onBlockUser(userId);
  } catch (error) {
    return {
      error: "Failed to block the user",
    };
  }

  revalidatePath(`/friends`);
  revalidatePath(`/friends/blocked`);

  return { data: blockedUser };
};

export const blockUser = createSafeAction(BlockUser, handler);

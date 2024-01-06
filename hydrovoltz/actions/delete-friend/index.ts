"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { toPusherKey } from "@/lib/utils";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { DeleteFriend } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let friend;

  try {
    friend = await db.friend.delete({
      where: {
        id,
      },
      include: {
        friend: true,
        initiator: true,
      },
    });

    const otherUser =
      friend.friend.id === self.id ? friend.initiator : friend.friend;

    const selfKey = toPusherKey(`user:${self.id}:friends`);
    const otherKey = toPusherKey(`user:${otherUser.id}:friends`);

    const blockPromises = [
      pusherServer.trigger(selfKey, `removed_friend`, {
        id: otherUser.id,
      }),
      pusherServer.trigger(otherKey, `removed_friend`, {
        id: self.id,
      }),
    ];

    await Promise.all(blockPromises);
  } catch (error) {
    return {
      error: "Failed to remove friend",
    };
  }

  revalidatePath("/friends");

  return { data: friend };
};

export const deleteFriend = createSafeAction(DeleteFriend, handler);

"use server";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { db } from "@/lib/db";

import { DeleteDirectMessage } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, conversationId } = data;

  let directMessage;

  try {
    await pusherServer.trigger(
      toPusherKey(`chat:${conversationId}`),
      "deleted-message",
      { id }
    );

    directMessage = await db.directMessage.delete({
      where: {
        id,
        userId: self.id,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete the message",
    };
  }

  return { data: directMessage };
};

export const deleteDirectMessage = createSafeAction(
  DeleteDirectMessage,
  handler
);

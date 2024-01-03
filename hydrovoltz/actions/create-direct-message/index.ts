"use server";

import { getSelf } from "@/lib/auth-service";
import { pusherServer } from "@/lib/pusher";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateDirectMessage } from "./schema";
import { toPusherKey } from "@/lib/utils";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { content, fileUrl, conversationId } = data;

  let directMessage;
  try {
    directMessage = {
      content,
      fileUrl,
      conversationId,
      user: self,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deleted: false,
    };

    await pusherServer.trigger(
      toPusherKey(`chat:${conversationId}`),
      "incoming-messages",
      directMessage
    );

    directMessage = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        userId: self.id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to send a direct message",
    };
  }

  return { data: directMessage };
};

export const createDirectMessage = createSafeAction(
  CreateDirectMessage,
  handler
);

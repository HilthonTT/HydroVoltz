"use server";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateDirectMessage } from "./schema";

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
    directMessage = await db.directMesssage.create({
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

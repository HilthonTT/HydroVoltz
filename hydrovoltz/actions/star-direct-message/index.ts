"use server";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { StarDirectMessage } from "./schema";
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
    directMessage = await db.directMessage.update({
      where: {
        id,
        userId: self.id,
        conversationId,
      },
      data: {
        starred: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to star the message",
    };
  }

  return { data: directMessage };
};

export const starDirectMessage = createSafeAction(StarDirectMessage, handler);

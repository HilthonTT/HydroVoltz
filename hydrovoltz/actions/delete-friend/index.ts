"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
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
  } catch (error) {
    return {
      error: "Failed to remove friend",
    };
  }

  revalidatePath("/friends");

  return { data: friend };
};

export const deleteFriend = createSafeAction(DeleteFriend, handler);

"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { unblockUser as onUnblockUser } from "@/lib/block-service";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UnBlockUser } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { userId } = data;

  let unblockedUser;
  try {
    unblockedUser = await onUnblockUser(userId);
  } catch (error) {
    return {
      error: "Failed to unblock the user",
    };
  }

  revalidatePath(`/friends/blocked`);

  return { data: unblockedUser };
};

export const blockUser = createSafeAction(UnBlockUser, handler);

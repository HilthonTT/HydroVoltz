"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { blockUser as onBlockUser } from "@/lib/block-service";
import { createSafeAction } from "@/lib/create-safe-action";

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

  let blockedUser;
  try {
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

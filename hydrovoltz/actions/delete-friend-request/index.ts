"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { DeleteFriendRequest } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let friendRequest;

  try {
    friendRequest = await db.friendRequest.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to cancel friend request",
    };
  }

  revalidatePath("/friends/added");

  return { data: friendRequest };
};

export const deleteFriendRequest = createSafeAction(
  DeleteFriendRequest,
  handler
);

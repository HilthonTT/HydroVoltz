"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const { userId } = data;

  let friendRequests;

  try {
    friendRequests = await db.friendRequest.deleteMany({
      where: {
        senderId: self.id,
        receiverId: userId,
        status: "PENDING",
      },
    });
  } catch (error) {
    return {
      error: "Failed to cancel friend request",
    };
  }

  revalidatePath("/friends");
  redirect("/friends?type=pending");
};

export const deleteFriendRequest = createSafeAction(
  DeleteFriendRequest,
  handler
);

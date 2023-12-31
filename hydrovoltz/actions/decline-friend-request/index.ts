"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { DeclineFriendRequest } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let request;

  try {
    request = await db.friendRequest.update({
      where: {
        id,
      },
      data: {
        status: "DECLINED",
      },
    });
  } catch (error) {
    return {
      error: "An error occurred while declining the friend request",
    };
  }

  revalidatePath("/friends/pending");

  return { data: request };
};

export const declineFriendRequest = createSafeAction(
  DeclineFriendRequest,
  handler
);

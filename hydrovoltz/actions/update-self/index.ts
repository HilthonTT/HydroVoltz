"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

import { InputType, ReturnType } from "./types";
import { UpdateSelf } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const self = await getSelf();

  if (!self) {
    return {
      error: "Unauthorized",
    };
  }

  const { status } = data;

  let user;

  try {
    user = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update status",
    };
  }

  revalidatePath("/settings");

  return { data: user };
};

export const updateSelf = createSafeAction(UpdateSelf, handler);

import { z } from "zod";

export const CreateFriendRequest = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is required",
    })
    .min(4, {
      message: "Username is too short",
    }),
});

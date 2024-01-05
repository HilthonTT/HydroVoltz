import { z } from "zod";

export const UnBlockUser = z.object({
  userId: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID is required",
  }),
});

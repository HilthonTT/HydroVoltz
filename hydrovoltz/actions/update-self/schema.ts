import { z } from "zod";

export const UpdateSelf = z.object({
  status: z
    .string({
      required_error: "Status is required",
      invalid_type_error: "Status is required",
    })
    .min(1, {
      message: "Status is too short",
    }),
});

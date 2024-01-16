import { z } from "zod";

export const CreateDirectMessage = z.object({
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content is required",
    })
    .min(1, {
      message: "Message Content is too short",
    }),
  fileUrl: z.string().optional(),
  conversationId: z.string({
    required_error: "Conversation ID is required",
  }),
  userId: z.string({
    required_error: "User ID is required",
  }),
});

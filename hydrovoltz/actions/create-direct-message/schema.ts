import { z } from "zod";

export const CreateDirectMessage = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content is required",
  }),
  fileUrl: z.string().optional(),
  conversationId: z.string({
    required_error: "Conversation ID is required",
  }),
});

import { z } from "zod";

export const DeleteDirectMessage = z.object({
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID is required",
  }),
  conversationId: z.string({
    required_error: "Conversation ID is required",
    invalid_type_error: "Conversation ID is required",
  }),
});

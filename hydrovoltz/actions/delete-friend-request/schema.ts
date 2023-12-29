import { z } from "zod";

export const DeleteFriendRequest = z.object({
  userId: z.string(),
});

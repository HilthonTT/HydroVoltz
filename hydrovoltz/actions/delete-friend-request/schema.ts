import { z } from "zod";

export const DeleteFriendRequest = z.object({
  id: z.string(),
});

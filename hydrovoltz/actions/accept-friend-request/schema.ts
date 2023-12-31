import { z } from "zod";

export const AcceptFriendRequest = z.object({
  id: z.string(),
});

import { z } from "zod";

export const DeclineFriendRequest = z.object({
  id: z.string(),
});

import { z } from "zod";

export const DeleteFriend = z.object({
  id: z.string(),
});

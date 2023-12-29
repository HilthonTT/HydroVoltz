import { z } from "zod";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { ActionState } from "@/lib/create-safe-action";

import { CreateFriendRequest } from "./schema";

export type InputType = z.infer<typeof CreateFriendRequest>;
export type ReturnType = ActionState<
  InputType,
  FriendRequestWithReceiverAndSender
>;

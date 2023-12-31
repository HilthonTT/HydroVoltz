import { z } from "zod";

import { FriendWithFriendWithInitiator } from "@/types";
import { ActionState } from "@/lib/create-safe-action";

import { DeleteFriend } from "./schema";

export type InputType = z.infer<typeof DeleteFriend>;
export type ReturnType = ActionState<InputType, FriendWithFriendWithInitiator>;

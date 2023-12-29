import { z } from "zod";
import { FriendRequest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteFriendRequest } from "./schema";

export type InputType = z.infer<typeof DeleteFriendRequest>;
export type ReturnType = ActionState<InputType, FriendRequest[]>;

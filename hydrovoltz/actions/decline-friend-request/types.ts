import { z } from "zod";

import { FriendRequest } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

import { DeclineFriendRequest } from "./schema";

export type InputType = z.infer<typeof DeclineFriendRequest>;
export type ReturnType = ActionState<InputType, FriendRequest>;

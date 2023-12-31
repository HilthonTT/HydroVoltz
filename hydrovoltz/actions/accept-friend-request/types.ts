import { z } from "zod";

import { Friend } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

import { AcceptFriendRequest } from "./schema";

export type InputType = z.infer<typeof AcceptFriendRequest>;
export type ReturnType = ActionState<InputType, Friend>;

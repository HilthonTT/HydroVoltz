import { z } from "zod";

import { User } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateSelf } from "./schema";

export type InputType = z.infer<typeof UpdateSelf>;
export type ReturnType = ActionState<InputType, User>;

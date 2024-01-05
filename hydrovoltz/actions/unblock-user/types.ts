import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Block, User } from "@prisma/client";

import { UnBlockUser } from "./schema";

export type InputType = z.infer<typeof UnBlockUser>;
export type ReturnType = ActionState<InputType, Block & { blocked: User }>;

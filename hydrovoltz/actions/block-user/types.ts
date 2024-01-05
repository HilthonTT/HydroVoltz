import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Block, User } from "@prisma/client";

import { BlockUser } from "./schema";

export type InputType = z.infer<typeof BlockUser>;
export type ReturnType = ActionState<InputType, Block & { blocked: User }>;

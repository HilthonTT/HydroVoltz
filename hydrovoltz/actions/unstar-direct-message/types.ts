import { z } from "zod";

import { DirectMessage } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { StarDirectMessage } from "./schema";

export type InputType = z.infer<typeof StarDirectMessage>;
export type ReturnType = ActionState<InputType, DirectMessage>;

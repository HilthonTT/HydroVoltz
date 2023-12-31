import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { DirectMesssage } from "@prisma/client";

import { CreateDirectMessage } from "./schema";

export type InputType = z.infer<typeof CreateDirectMessage>;
export type ReturnType = ActionState<InputType, DirectMesssage>;

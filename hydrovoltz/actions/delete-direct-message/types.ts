import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { DirectMessage } from "@prisma/client";

import { DeleteDirectMessage } from "./schema";

export type InputType = z.infer<typeof DeleteDirectMessage>;
export type ReturnType = ActionState<InputType, DirectMessage>;

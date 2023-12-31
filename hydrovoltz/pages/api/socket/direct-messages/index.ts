import { NextApiRequest } from "next";
import { z } from "zod";

import { getSelfPages } from "@/lib/auth-service";
import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";

const BodySchema = z.object({
  content: z.string({
    required_error: "Content is required",
  }),
  fileUrl: z.string().optional(),
});

const QuerySchema = z.object({
  conversationId: z.string({
    required_error: "Conversation ID is required",
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const self = await getSelfPages(req);
    if (!self) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const parsedBody = await BodySchema.safeParseAsync(req.body);
    if (!parsedBody?.success) {
      return res.status(400).json({ error: "Invalid body parameters" });
    }

    const parsedQuery = await QuerySchema.safeParseAsync(req.query);
    if (!parsedQuery?.success) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const { content, fileUrl } = parsedBody.data;
    const { conversationId } = parsedQuery.data;

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
        OR: [
          {
            userOne: {
              externalUserId: self.id,
            },
          },
          {
            userTwo: {
              externalUserId: self.id,
            },
          },
        ],
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const user =
      conversation.userOne.externalUserId === self?.id
        ? conversation.userOne
        : conversation.userTwo;

    if (!user) {
      return res
        .status(404)
        .json({ error: "You are not part of the conversation" });
    }

    const message = await db.directMesssage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    const conversationKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(conversationKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}

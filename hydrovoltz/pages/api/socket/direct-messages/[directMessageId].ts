import { NextApiRequest } from "next";
import { z } from "zod";

import { NextApiResponseServerIo } from "@/types";
import { getSelfPages } from "@/lib/auth-service";
import { db } from "@/lib/db";

const QuerySchema = z.object({
  directMessageId: z.string({
    required_error: "Direct Message ID is required",
  }),
  conversationId: z.string({
    required_error: "Conversation ID is required",
  }),
});

const BodySchema = z.object({
  content: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const self = await getSelfPages(req);

    if (!self) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const parsedQuery = await QuerySchema.safeParseAsync(req.query);
    if (!parsedQuery?.success) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const parsedBody = await BodySchema.safeParseAsync(req.body);
    if (!parsedBody?.success) {
      return res.status(400).json({ error: "Invalid body parameters" });
    }

    const { content } = parsedBody.data;
    const { directMessageId, conversationId } = parsedQuery.data;

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
      return res.status(404).json({ error: "Conversation not found" });
    }

    const user =
      conversation.userOne.externalUserId === self?.id
        ? conversation.userOne
        : conversation.userTwo;

    if (!user) {
      return res
        .status(404)
        .json({ error: "You are not part of this conversation" });
    }

    let directMessage = await db.directMesssage.findUnique({
      where: {
        id: directMessageId,
        conversationId,
      },
      include: {
        user: true,
      },
    });

    if (!directMessage || directMessage?.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = directMessage?.user?.id === user?.id;

    if (!isMessageOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "DELETE") {
      directMessage = await db.directMesssage.update({
        where: {
          id: directMessageId,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          user: true,
        },
      });
    }

    if (req.method === "PATCH") {
      directMessage = await db.directMesssage.update({
        where: {
          id: directMessageId,
        },
        data: {
          content,
        },
        include: {
          user: true,
        },
      });
    }

    const updateKey = `chat:${directMessage}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);

    return res.status(200).json(directMessage);
  } catch (error) {
    console.log("[DIRECT_MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}

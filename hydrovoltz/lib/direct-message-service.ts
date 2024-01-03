import { db } from "@/lib/db";

export const getDirectMessages = async (conversationId: string) => {
  const directMessages = await db.directMessage.findMany({
    where: {
      conversationId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return directMessages;
};

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

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

export const getStarredDirectMessages = async () => {
  const self = await getSelf();

  const starredDirectMessages = await db.directMessage.findMany({
    where: {
      userId: self.id,
      starred: true,
    },
    include: {
      conversation: {
        include: {
          userOne: true,
          userTwo: true,
        },
      },
    },
  });

  return starredDirectMessages;
};

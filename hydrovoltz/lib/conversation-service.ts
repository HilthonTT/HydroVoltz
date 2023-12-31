import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const findConversation = async (userOneId: string, userTwoId: string) => {
  try {
    const conversation = await db.conversation.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId,
          userTwoId,
        },
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });

    return conversation;
  } catch {
    return null;
  }
};

const createNewConversation = async (userOneId: string, userTwoId: string) => {
  try {
    const conversation = await db.conversation.create({
      data: {
        userOneId,
        userTwoId,
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });

    return conversation;
  } catch {
    return null;
  }
};

export const getOrCreateConversation = async (
  userOneId: string,
  userTwoId: string
) => {
  let conversation =
    (await findConversation(userOneId, userTwoId)) ||
    (await findConversation(userTwoId, userOneId));

  if (!conversation) {
    conversation = await createNewConversation(userOneId, userTwoId);
  }

  return conversation;
};

export const getUserConversations = async () => {
  const self = await getSelf();

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        {
          userOneId: self.id,
        },
        {
          userTwoId: self.id,
        },
      ],
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });

  return conversations;
};

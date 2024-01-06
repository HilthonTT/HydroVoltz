import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  try {
    await db.friend.delete({
      where: {
        initiatorId_friendId: {
          initiatorId: self.id,
          friendId: otherUser.id,
        },
      },
    });
  } catch (error) {
    // Means that the user is not found
  }

  try {
    await db.friend.delete({
      where: {
        initiatorId_friendId: {
          initiatorId: otherUser.id,
          friendId: self.id,
        },
      },
    });
  } catch (error) {
    // Means that the user is not found
  }

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const blocks = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  const blockedUsers = blocks.map((block) => {
    return block.blocked;
  });

  return blockedUsers;
};

export const isBlockedByCurrentUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  if (id === self.id) {
    return false;
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: id,
        blockerId: self.id,
      },
    },
  });

  return !!existingBlock;
};

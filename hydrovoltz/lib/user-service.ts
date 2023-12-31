import { User } from "@prisma/client";

import { db } from "@/lib/db";
import { isFriends } from "@/lib/friend-service";

export const getUserByUsername = async (username: string, self?: User) => {
  if (self?.username === username) {
    return self;
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  // Not allowed to view user if they're not friends with them
  const isFriendWithUser = await isFriends(user.id);
  if (!isFriendWithUser) {
    return null;
  }

  return user;
};

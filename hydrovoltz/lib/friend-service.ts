import { User } from "@prisma/client";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getFriends = async (): Promise<User[]> => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Not authorized");
  }

  const friendships = await db.friend.findMany({
    where: {
      OR: [{ initiatorId: self.id }, { friendId: self.id }],
    },
    include: {
      initiator: true,
      friend: true,
    },
  });

  // Extract users from the friendships
  const friends = friendships.map((friendship) => {
    if (friendship.initiator.id === self.id) {
      return friendship.friend;
    }

    return friendship.initiator;
  });

  return friends;
};

export const getPendingFriendRequests = async () => {
  const self = await getSelf();

  const pendingRequests = await db.friendRequest.findMany({
    where: {
      AND: [
        {
          senderId: self.id,
        },
        {
          status: "PENDING",
        },
      ],
    },
    include: {
      receiver: true,
      sender: true,
    },
  });

  const requestedUsers = pendingRequests.map((request) => {
    return request.receiver;
  });

  return requestedUsers;
};

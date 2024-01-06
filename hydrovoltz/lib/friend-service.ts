import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isFriendsWithUsername = async (username: string) => {
  const self = await getSelf();

  const friend = await db.friend.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              initiator: {
                username: self.username,
              },
              friend: {
                username: username,
              },
            },
            {
              initiator: {
                username: username,
              },
              friend: {
                username: self.username,
              },
            },
          ],
        },
      ],
    },
  });

  return !!friend;
};

export const isFriends = async (userId: string) => {
  const self = await getSelf();

  const friend = await db.friend.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              initiatorId: self.id,
              friendId: userId,
            },
            {
              initiatorId: userId,
              friendId: self.id,
            },
          ],
        },
      ],
    },
  });

  return !!friend;
};

export const getFriends = async () => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Not authorized");
  }

  const friends = await db.friend.findMany({
    where: {
      OR: [{ initiatorId: self.id }, { friendId: self.id }],
    },
    include: {
      initiator: true,
      friend: true,
    },
  });

  return friends;
};

export const getFriendsUser = async (selfId?: string, username?: string) => {
  let self: string;

  if (selfId) {
    self = selfId;
  } else {
    const mySelf = await getSelf();
    self = mySelf.id;
  }

  if (!self) {
    throw new Error("Not authorized");
  }

  const friends = await db.friend.findMany({
    where: {
      OR: [
        {
          initiatorId: self,
        },
        {
          friendId: self,
        },
      ],
    },
    include: {
      initiator: true,
      friend: true,
    },
  });

  const users = friends.flatMap((friend) => {
    const user = friend.friend.id === self ? friend.initiator : friend.friend;

    if (
      !username ||
      (username && user.username.toLowerCase().includes(username.toLowerCase()))
    ) {
      return [user];
    }

    return [];
  });

  return users;
};

export const getPendingFriendRequests = async () => {
  const self = await getSelf();

  const pendingRequests = await db.friendRequest.findMany({
    where: {
      AND: [
        {
          receiverId: self.id,
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

  return pendingRequests;
};

export const getAddedUsers = async () => {
  const self = await getSelf();

  const nonAcceptedFriendRequests = await db.friendRequest.findMany({
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

  return nonAcceptedFriendRequests;
};

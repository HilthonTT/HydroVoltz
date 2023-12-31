import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

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

export const getFriendsUser = async (selfId?: string) => {
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
      OR: [{ initiatorId: self }, { friendId: self }],
    },
    include: {
      initiator: true,
      friend: true,
    },
  });

  const users = friends.map((friend) => {
    if (friend.friend.id === self) {
      return friend.initiator;
    }

    return friend.friend;
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

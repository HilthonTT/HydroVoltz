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

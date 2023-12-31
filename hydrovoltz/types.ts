import { Friend, FriendRequest, User } from "@prisma/client";

export type FriendRequestWithReceiverAndSender = FriendRequest & {
  receiver: User;
  sender: User;
};

export type FriendWithFriendWithInitiator = Friend & {
  friend: User;
  initiator: User;
};

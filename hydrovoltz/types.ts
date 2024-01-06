import { Call, Friend, FriendRequest, User } from "@prisma/client";

export type FriendRequestWithReceiverAndSender = FriendRequest & {
  receiver: User;
  sender: User;
};

export type FriendWithFriendWithInitiator = Friend & {
  friend: User;
  initiator: User;
};

export type ExtendedMessage = {
  senderId: string;
  senderImage: string;
  senderName: string;
};

export type CallWithUser = Call & {
  userOne: User;
  userTwo: User;
};

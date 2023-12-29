import { FriendRequest, User } from "@prisma/client";

export type FriendRequestWithReceiverAndSender = FriendRequest & {
  receiver: User;
  sender: User;
};

import { Friend, FriendRequest, User } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type FriendRequestWithReceiverAndSender = FriendRequest & {
  receiver: User;
  sender: User;
};

export type FriendWithFriendWithInitiator = Friend & {
  friend: User;
  initiator: User;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

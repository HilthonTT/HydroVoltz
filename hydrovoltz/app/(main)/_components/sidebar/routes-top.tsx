"use client";

import { useEffect, useState } from "react";
import { Friend, User } from "@prisma/client";
import { MessageSquareText, Pencil, PhoneCall, Users } from "lucide-react";

import { toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { FriendRequestWithReceiverAndSender } from "@/types";

import { Route } from "./route";
import { Badge } from "@/components/ui/badge";
interface RoutesTopsProps {
  self: User;
  friendRequests: FriendRequestWithReceiverAndSender[];
}

export const RoutesTops = ({ self, friendRequests }: RoutesTopsProps) => {
  const [requests, setRequests] =
    useState<FriendRequestWithReceiverAndSender[]>(friendRequests);

  const routes = [
    {
      icon: MessageSquareText,
      href: "/chat",
      label: "Chat",
    },
    {
      icon: Users,
      href: "/friends",
      label: "Friends",
    },
    {
      icon: PhoneCall,
      href: "/call",
      label: "Call",
    },
    {
      icon: Pencil,
      href: "/drafts",
      label: "Drafts",
    },
  ];

  useEffect(() => {
    const friendChannel = toPusherKey(
      `user:${self.id}:incoming_friend_requests`
    );

    const newRequestHandler = (
      newRequest: FriendRequestWithReceiverAndSender
    ) => {
      setRequests((prev) => {
        const isDuplicate = prev.some(
          (request) => request.id === newRequest.id
        );

        if (!isDuplicate) {
          return [...prev, newRequest];
        }

        return prev;
      });
    };

    pusherClient
      .subscribe(friendChannel)
      .bind("incoming_friend_requests", newRequestHandler);

    return () => {
      pusherClient.unsubscribe(friendChannel);
      pusherClient.unbind("incoming_friend_requests", newRequestHandler);
    };
  }, [self.id]);

  const friendRequestsCount = requests.length;

  return (
    <div className="flex flex-col space-y-5 mt-5">
      {routes?.map(({ href, icon: Icon, label }) => {
        const isFriendRequests = href === "/friends";

        return (
          <Route key={href} href={href} label={label}>
            <Icon className="h-6 w-6" />
            {isFriendRequests && (
              <div className="absolute -top-2 -right-2">
                <Badge className="p-[2px]">{friendRequestsCount}</Badge>
              </div>
            )}
          </Route>
        );
      })}
    </div>
  );
};

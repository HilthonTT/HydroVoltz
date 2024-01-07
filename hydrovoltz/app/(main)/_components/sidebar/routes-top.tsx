"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { MessageSquareText, Pencil, PhoneCall, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { CallWithUser, FriendRequestWithReceiverAndSender } from "@/types";

import { Route } from "./route";

interface RoutesTopsProps {
  self: User;
  friendRequests: FriendRequestWithReceiverAndSender[];
}

export const RoutesTops = ({ self, friendRequests }: RoutesTopsProps) => {
  const [isNotified, setIsNotified] = useState(false);

  const [requests, setRequests] =
    useState<FriendRequestWithReceiverAndSender[]>(friendRequests);

  const [calls, setCalls] = useState<CallWithUser[]>([]);

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

    const callChannel = toPusherKey(`user:${self.id}:incoming_calls`);

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

    const newCallHandler = (newCall: CallWithUser) => {
      const otherUser =
        newCall.userOneId === self.id ? newCall.userTwo : newCall.userOne;

      setCalls((prev) => {
        const isDuplicate = prev.some((call) => call.id === newCall.id);

        if (!isDuplicate) {
          return [...prev, newCall];
        }

        return prev;
      });

      if (isNotified) {
        return;
      }

      setIsNotified(true);

      setTimeout(() => {
        toast.info(`${otherUser.username} has attempted to call you!`);
        setIsNotified(false);
      }, 1000);
    };

    pusherClient.subscribe(friendChannel);
    pusherClient.subscribe(callChannel);
    pusherClient.bind("incoming_friend_requests", newRequestHandler);
    pusherClient.bind("incoming_calls", newCallHandler);

    return () => {
      pusherClient.unsubscribe(friendChannel);
      pusherClient.unsubscribe(callChannel);
      pusherClient.unbind("incoming_friend_requests", newRequestHandler);
      pusherClient.unbind("incoming_calls", newCallHandler);
    };
  }, [self.id, isNotified]);

  useEffect(() => {
    const acceptDeclineChannel = toPusherKey(
      `user:${self.id}:declined_accepted_friend_requests`
    );

    const onAcceptDecline = ({ id }: { id: string }) => {
      setRequests((prev) => prev.filter((request) => request.id !== id));
    };

    pusherClient.subscribe(acceptDeclineChannel);
    pusherClient.bind("declined_accepted_friend_requests", onAcceptDecline);

    return () => {
      pusherClient.unsubscribe(acceptDeclineChannel);
      pusherClient.unbind("declined_accepted_friend_requests", onAcceptDecline);
    };
  }, [self.id]);

  const friendRequestsCount = requests.length;

  return (
    <div className="flex flex-col space-y-5 mt-5">
      {routes?.map(({ href, icon: Icon, label }) => {
        const isFriendRequests = href === "/friends";
        const isCall = href === "/call";

        const requestCount = requests.length > 99 ? "99+" : requests.length;
        const callCount = calls.length > 99 ? "99+" : calls.length;

        return (
          <Route key={href} href={href} label={label}>
            <Icon className="h-6 w-6" />
            {isFriendRequests && friendRequestsCount > 0 && (
              <div className="absolute -top-2 -right-2">
                <Badge className="p-[2px]">{requestCount}</Badge>
              </div>
            )}
            {isCall && calls.length > 0 && (
              <div className="absolute -top-2 -right-2">
                <Badge className="p-[2px]">{callCount}</Badge>
              </div>
            )}
          </Route>
        );
      })}
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { User } from "@prisma/client";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyList } from "@/components/list-empty";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

import { RequestCard } from "./request-card";

interface ListProps {
  initialRequests: FriendRequestWithReceiverAndSender[];
  self: User;
}

export const List = ({ initialRequests, self }: ListProps) => {
  const [requests, setRequests] =
    useState<FriendRequestWithReceiverAndSender[]>(initialRequests);

  const isClient = useIsClient();

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

    pusherClient.subscribe(friendChannel);
    pusherClient.bind("incoming_friend_requests", newRequestHandler);

    return () => {
      pusherClient.unsubscribe(friendChannel);
      pusherClient.unbind("incoming_friend_requests", newRequestHandler);
    };
  }, [self.id]);

  const onAction = (id: string) => {
    const updatedRequests = requests.filter((request) => request.id !== id);

    setRequests(updatedRequests);
  };

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Pending Friend Requests - {requests?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {requests?.length === 0 && (
          <EmptyList label="There are no pending friend requests. He's a dead corpse for you." />
        )}
        {requests?.map((request) => (
          <RequestCard key={request.id} request={request} onAction={onAction} />
        ))}
      </div>
    </div>
  );
};

export const ListSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-[170px]" />
      <Separator className="my-4" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </>
  );
};

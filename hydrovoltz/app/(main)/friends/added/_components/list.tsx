"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { EmptyList } from "@/components/list-empty";
import { toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";

import { RequestCard } from "./request-card";

interface ListProps {
  data: FriendRequestWithReceiverAndSender[];
  self: User;
}

export const List = ({ data, self }: ListProps) => {
  const [request, setRequests] =
    useState<FriendRequestWithReceiverAndSender[]>(data);

  const isClient = useIsClient();

  useEffect(() => {
    const acceptDeclineChannel = toPusherKey(
      `user:${self.id}:declined_accepted_friend_requests`
    );

    const onAcceptDecline = ({ id }: { id: string }) => {
      console.log("DECLINED!");

      setRequests((prev) => prev.filter((request) => request.id !== id));
    };

    pusherClient.subscribe(acceptDeclineChannel);
    pusherClient.bind("declined_accepted_friend_requests", onAcceptDecline);

    return () => {
      pusherClient.unsubscribe(acceptDeclineChannel);
      pusherClient.unbind("declined_accepted_friend_requests", onAcceptDecline);
    };
  }, [self.id]);

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Added Users - {request?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {request?.length === 0 && (
          <EmptyList label="You did not add any people. He's a dead corpse for you." />
        )}
        {request?.map((request) => (
          <RequestCard key={request.id} request={request} self={self} />
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

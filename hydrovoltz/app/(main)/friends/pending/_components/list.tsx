"use client";

import { useIsClient } from "usehooks-ts";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { RequestCard } from "./request-card";
import { EmptyList } from "@/components/list-empty";

interface ListProps {
  data: FriendRequestWithReceiverAndSender[];
}

export const List = ({ data }: ListProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Pending Friend Requests - {data?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {data?.length === 0 && (
          <EmptyList label="There are no pending friend requests. He's a dead corpse for you." />
        )}
        {data?.map((request) => (
          <RequestCard key={request.id} request={request} />
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

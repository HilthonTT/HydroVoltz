"use client";

import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { RequestCard } from "./request-card";
import { EmptyList } from "@/components/list-empty";

interface ListProps {
  data: FriendRequestWithReceiverAndSender[];
  self: User;
}

export const List = ({ data, self }: ListProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Added Users - {data?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {data?.length === 0 && (
          <EmptyList label="You did not add any people. He's a dead corpse for you." />
        )}
        {data?.map((request) => (
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

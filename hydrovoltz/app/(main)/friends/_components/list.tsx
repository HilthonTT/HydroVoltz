"use client";

import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyList } from "@/components/list-empty";
import { FriendWithFriendWithInitiator } from "@/types";

import { FriendCard } from "./friend-card";

interface ListProps {
  friends: FriendWithFriendWithInitiator[];
  self: User;
}

export const List = ({ friends, self }: ListProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        All friends - {friends?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {friends?.length === 0 && (
          <EmptyList label="You do not have any friends. He's a dead corpse for you." />
        )}
        {friends?.map((friend) => (
          <FriendCard key={friend.id} friend={friend} self={self} />
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

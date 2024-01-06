"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyList } from "@/components/list-empty";
import { FriendWithFriendWithInitiator } from "@/types";
import { toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";

import { FriendCard } from "./friend-card";

interface ListProps {
  initialFriends: FriendWithFriendWithInitiator[];
  self: User;
}

export const List = ({ initialFriends, self }: ListProps) => {
  const [friends, setFriends] =
    useState<FriendWithFriendWithInitiator[]>(initialFriends);
  const isClient = useIsClient();

  useEffect(() => {
    const friendChannel = toPusherKey(`user:${self.id}:friends`);

    const removedFriend = ({ id }: { id: string }) => {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
    };

    pusherClient.subscribe(friendChannel);
    pusherClient.bind("removed_friend", removedFriend);

    return () => {
      pusherClient.unsubscribe(friendChannel);
      pusherClient.unbind("removed_friend", removedFriend);
    };
  }, [self.id]);

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

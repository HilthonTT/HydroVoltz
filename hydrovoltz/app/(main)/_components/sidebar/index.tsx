"use client";

import { Friend, User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { Skeleton } from "@/components/ui/skeleton";
import { FriendRequestWithReceiverAndSender } from "@/types";

import { RoutesBottom } from "./routes-bottom";
import { RoutesTops } from "./routes-top";
import { Wrapper } from "./wrapper";

interface SidebarProps {
  self: User;
  friendRequests: FriendRequestWithReceiverAndSender[];
}

export const Sidebar = ({ self, friendRequests }: SidebarProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <SidebarSkeleton />;
  }

  return (
    <Wrapper>
      <RoutesTops self={self} friendRequests={friendRequests} />
      <RoutesBottom />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <Wrapper>
      <div className="flex flex-col space-y-5 mt-5">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="mx-auto p-2 w-10 h-10 bg-primary/20" />
        ))}
      </div>
      <div className="mt-auto pb-24">
        <div className="flex flex-col space-y-5 mt-5">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="mx-auto p-2 w-10 h-10 bg-primary/20" />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

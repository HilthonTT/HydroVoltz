"use client";

import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyList } from "@/components/list-empty";

import { BlockCard } from "./block-card";

interface ListProps {
  data: User[];
}

export const List = ({ data }: ListProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Blocked Users - {data?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {data?.length === 0 && (
          <EmptyList label="You did not block any people. He's a dead corpse for you." />
        )}
        {data?.map((user) => (
          <BlockCard key={user.id} user={user} />
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

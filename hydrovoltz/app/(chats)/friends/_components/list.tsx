"use client";

import { User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useIsClient } from "usehooks-ts";

import { Separator } from "@/components/ui/separator";

interface ListProps {
  users: User[];
}

export const List = ({ users }: ListProps) => {
  const isClient = useIsClient();
  const params = useSearchParams();

  const type = params.get("type");
  let title;

  const userLength = users?.length || 0;

  switch (type) {
    case "blocked":
      title = `Blocked users - ${userLength}`;
      break;
    case "pending":
      title = `Pending friend requests - ${userLength}`;
      break;
    default:
      title = `All friends - ${userLength}`;
      break;
  }

  if (!isClient) {
    return <ListSkeleton />;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">{title}</h2>
      <Separator className="my-4" />
    </div>
  );
};

export const ListSkeleton = () => {
  return <div>Skeleton</div>;
};

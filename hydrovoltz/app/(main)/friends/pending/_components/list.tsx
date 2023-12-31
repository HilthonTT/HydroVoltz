"use client";

import { useIsClient } from "usehooks-ts";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Separator } from "@/components/ui/separator";

import { RequestCard } from "./request-card";

interface ListProps {
  data: FriendRequestWithReceiverAndSender[];
}

export const List = ({ data }: ListProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-1">
      <h2 className="font-semibold text-xl lg:text-2xl">
        Pending Friend Requests - {data?.length || 0}
      </h2>
      <Separator className="my-4" />
      <div className="space-y-4">
        {data?.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

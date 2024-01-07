"use client";

import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { ConversationWithUsers } from "@/types";
import { useDrafts } from "@/lib/draft-service";

type Draft = {
  draft: string;
  conversation: ConversationWithUsers;
};

interface DraftListProps {
  self: User;
  conversations: ConversationWithUsers[];
  username?: string | null;
}

export const DraftList = ({
  conversations,
  self,
  username,
}: DraftListProps) => {
  const isClient = useIsClient();
  const drafts = useDrafts(conversations, self, username);

  console.log(drafts);

  if (!isClient) {
    return <DraftListSkeleton />;
  }

  return <div>Drafts</div>;
};

export const DraftListSkeleton = () => {
  return <div>Skeleton</div>;
};

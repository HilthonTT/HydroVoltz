"use client";

import { User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";
import { useSearchParams } from "next/navigation";

import { WidgetWrapper } from "@/components/widget-wrapper";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDraftSidebar } from "@/store/use-draft-sidebar";
import { useDrafts } from "@/lib/draft-service";
import { ConversationWithUsers } from "@/types";

import { UserCard, UserCardSkeleton } from "./user-card";
import { Search } from "./search";
import { Toggle } from "./toggle";

interface UserSidebarProps {
  self: User;
  conversations: ConversationWithUsers[];
}

export const Sidebar = ({ self, conversations }: UserSidebarProps) => {
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const { collapsed } = useDraftSidebar((state) => state);

  const username = searchParams.get("username");
  const drafts = useDrafts(conversations, self, username?.toLowerCase());

  if (!isClient) {
    return <UserSidebarSkeleton />;
  }

  return (
    <WidgetWrapper collapsed={collapsed}>
      <Toggle />
      <Search />
      <Separator />
      <div className="mt-5">
        <ScrollArea className="h-[680px] w-full p-4">
          {drafts.map((draft) => {
            const otherUser =
              draft.conversation.userOneId === self.id
                ? draft.conversation.userTwo
                : draft.conversation.userOne;

            return <UserCard key={otherUser.id} user={otherUser} />;
          })}
        </ScrollArea>
      </div>
    </WidgetWrapper>
  );
};

export const UserSidebarSkeleton = () => {
  const { collapsed } = useDraftSidebar((state) => state);

  return (
    <WidgetWrapper collapsed={collapsed}>
      <div className="p-2 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="bg-secondary lg:h-8 lg:w-[100px]" />
          <Skeleton className="bg-secondary lg:h-8 lg:w-8" />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <Skeleton className="bg-secondary w-[240px] h-8" />
          <Skeleton className="bg-secondary w-8 h-8" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
};

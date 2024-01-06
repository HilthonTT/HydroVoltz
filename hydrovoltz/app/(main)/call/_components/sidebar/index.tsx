"use client";

import { Call, User } from "@prisma/client";
import { useIsClient } from "usehooks-ts";

import { Skeleton } from "@/components/ui/skeleton";
import { WidgetWrapper } from "@/components/widget-wrapper";
import { Separator } from "@/components/ui/separator";
import { useCallSidebar } from "@/store/use-call-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CallWithUser } from "@/types";

import { CallCard, CallCardSkeleton } from "./call-card";
import { Toggle } from "./toggle";
import { Search } from "./search";

interface SidebarProps {
  calls: CallWithUser[];
  friends: User[];
  self: User;
}

export const CallSidebar = ({ calls, friends, self }: SidebarProps) => {
  const isClient = useIsClient();
  const { collapsed } = useCallSidebar((state) => state);

  if (!isClient) {
    return <CallSidebarSkeleton />;
  }

  return (
    <WidgetWrapper collapsed={collapsed}>
      <Toggle friends={friends} />
      <Search />
      <Separator />
      {!collapsed && calls.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-sm font-semibold">
            No call history
          </p>
        </div>
      )}
      <ScrollArea className="h-[680px] w-full p-4">
        {calls.map((call) => (
          <CallCard key={call.id} call={call} self={self} />
        ))}
      </ScrollArea>
    </WidgetWrapper>
  );
};

export const CallSidebarSkeleton = () => {
  const { collapsed } = useCallSidebar((state) => state);

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
            <CallCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
};

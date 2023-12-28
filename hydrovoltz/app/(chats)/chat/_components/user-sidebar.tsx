"use client";

import { User } from "@prisma/client";
import { PenSquare } from "lucide-react";
import { useIsClient } from "usehooks-ts";

import { WidgetWrapper } from "@/components/widget-wrapper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

import { UserCard, UserCardSkeleton } from "./user-card";
import { UserSearch } from "./user-search";

interface UserSidebarProps {
  self: User;
}

export const UserSidebar = ({ self }: UserSidebarProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <UserSidebarSkeleton />;
  }

  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between">
        <div className="p-2">
          <h1 className="font-semibold text-xl lg:text-2xl">Chats</h1>
        </div>
        <div className="p-2">
          <Hint label="New Chat" side="top">
            <Button variant="ghost" className="w-auto h-auto">
              <PenSquare className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      </div>
      <UserSearch />
      <Separator />
      <div className="mt-5">
        <div className="px-4">
          <UserCard user={self} />
        </div>
        <ScrollArea className="h-[680px] w-full p-4"></ScrollArea>
      </div>
    </WidgetWrapper>
  );
};

export const UserSidebarSkeleton = () => {
  return (
    <WidgetWrapper>
      <div className="p-2 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="bg-secondary h-8 w-[100px]" />
          <Skeleton className="bg-secondary h-8 w-8" />
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

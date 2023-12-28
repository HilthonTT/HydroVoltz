"use client";

import { User } from "@prisma/client";
import { PenSquare } from "lucide-react";

import { WidgetWrapper } from "@/components/widget-wrapper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hint } from "@/components/hint";

import { UserCard } from "./user-card";
import { UserSearch } from "./user-search";

interface UserSidebarProps {
  self: User;
}

export const UserSidebar = ({ self }: UserSidebarProps) => {
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

"use client";

import { MoreVertical } from "lucide-react";
import { User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FriendWithFriendWithInitiator } from "@/types";

import { DeleteFriendButton } from "./delete-friend-button";
import { BlockFriendButton } from "./block-friend-button";

interface FriendCardProps {
  friend: FriendWithFriendWithInitiator;
  self: User;
}

export const FriendCard = ({ friend, self }: FriendCardProps) => {
  const otherUser =
    friend.initiator.id === self.id ? friend.friend : friend.initiator;

  const status =
    (otherUser.status?.length as number) > 0
      ? otherUser.status
      : "This user has no status.";

  return (
    <div className="bg-secondary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={otherUser?.username}
          imageUrl={otherUser.imageUrl}
          size="lg"
        />
        <div className="space-y-1">
          <p className="capitalize font-semibold truncate">
            {otherUser.username}
          </p>
          <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[300px]">
            {status}
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="More options"
              variant="ghost"
              className="h-auto w-auto p-0">
              <MoreVertical className="h-6 w-6" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto min-w-[10px]">
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              className="w-auto">
              <DeleteFriendButton id={friend.id} self={self} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              className="w-auto">
              <BlockFriendButton
                id={otherUser.id}
                self={self}
                username={otherUser.username}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

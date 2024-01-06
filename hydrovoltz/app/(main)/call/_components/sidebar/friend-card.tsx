"use client";

import { User } from "@prisma/client";
import { MouseEvent } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

interface FriendCardProps {
  friend: User;
  isSelected: boolean;
  toggleFriendSelection: (friend: User) => void;
}

export const FriendCard = ({
  friend,
  isSelected,
  toggleFriendSelection,
}: FriendCardProps) => {
  const onClick = (e: MouseEvent) => {
    e.preventDefault();

    toggleFriendSelection(friend);
  };

  return (
    <DropdownMenuItem
      key={friend.id}
      onClick={onClick}
      className="group cursor-pointer">
      <div className="flex items-center justify-between p-2 w-full">
        <div className="flex items-center justify-center">
          <UserAvatar username={friend.username} imageUrl={friend.imageUrl} />
          <p className="capitalize mx-4 text-sm">{friend.username}</p>
        </div>
        <Checkbox
          className="border-transparent bg-secondary group-hover:bg-primary transition"
          checked={isSelected}
        />
      </div>
    </DropdownMenuItem>
  );
};

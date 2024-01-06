"use client";

import { User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";

import { UnblockButton } from "./unblock-button";

interface BlockCardProps {
  user: User;
}

export const BlockCard = ({ user }: BlockCardProps) => {
  return (
    <div className="bg-secondary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={user.username}
          imageUrl={user.imageUrl}
          size="lg"
        />
        <div className="space-y-1">
          <p className="capitalize font-semibold truncate">{user.username}</p>
          <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[300px]">
            Blocked
          </p>
        </div>
      </div>
      <div>
        <UnblockButton user={user} />
      </div>
    </div>
  );
};

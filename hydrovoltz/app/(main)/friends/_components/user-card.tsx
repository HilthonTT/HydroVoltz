"use client";

import { User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";

import { CancelButton } from "./cancel-button";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

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
            {status}
          </p>
        </div>
      </div>
      <div className="">
        <CancelButton userId={user.id} />
      </div>
    </div>
  );
};

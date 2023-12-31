"use client";

import { User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";

interface ChatHeaderProps {
  user: User;
}

export const ChatHeader = ({ user }: ChatHeaderProps) => {
  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

  const onClick = () => {
    // TODO: Open Dialog for user data
  };

  return (
    <div className="bg-secondary/30 h-14 flex items-center p-2 w-full">
      <button onClick={onClick} className="hover:opacity-75 transition">
        <UserAvatar username={user.username} imageUrl={user.imageUrl} />
      </button>
      <div className="ml-2 w-full">
        <p className="capitalize font-semibold">{user.username}</p>
        <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-60">
          {status}
        </p>
      </div>
    </div>
  );
};

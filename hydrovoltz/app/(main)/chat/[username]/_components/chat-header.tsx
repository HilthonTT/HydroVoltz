"use client";

import { User } from "@prisma/client";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { useUserModal } from "@/store/use-user-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatHeaderProps {
  user: User;
}

export const ChatHeader = ({ user }: ChatHeaderProps) => {
  const { onOpen } = useUserModal((state) => state);

  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

  const onClick = () => {
    onOpen(user);
  };

  return (
    <div className="bg-secondary/30 h-14 flex items-center justify-between p-2 w-full">
      <div className="flex">
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
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="bg-secondary/30 h-14 flex items-center  p-2 w-full">
      <UserAvatarSkeleton />
      <div className="ml-2 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

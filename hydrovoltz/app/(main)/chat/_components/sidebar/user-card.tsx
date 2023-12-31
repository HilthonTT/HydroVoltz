"use client";

import { useParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { user: self } = useUser();
  const router = useRouter();
  const params = useParams();

  const { collapsed } = useChatSidebar((state) => state);

  const onClick = () => {
    router.push(`/chat/${user.username}`);
  };

  const { username } = params;
  const isCurrentUser = username === user.username;

  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "group rounded-md bg-transparent hover:bg-secondary dark:hover:bg-secondary/80 transition mx-2 p-2",
        isCurrentUser ? "bg-secondary" : "bg-transparent"
      )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Hint label={user.username} show={collapsed}>
            <UserAvatar
              username={user.username}
              imageUrl={user.imageUrl}
              size="md"
            />
          </Hint>
          <div className={cn("text-sm ml-2", collapsed && "hidden")}>
            <p className="capitalize font-semibold">
              {user.username} {self?.id === user?.externalUserId && "(You)"}
            </p>
            <p
              title={status || ""}
              className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
              {status}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "opacity-0 group-hover:opacity-100 transition",
            collapsed && "hidden"
          )}>
          <Hint label="Options" side="right">
            <Button className="h-auto w-auto" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </div>
  );
};

export const UserCardSkeleton = () => {
  return (
    <div className="mx-2 p-2">
      <div className="flex items-center justify-center gap-x-2">
        <Skeleton className="rounded-full lg:h-8 lg:w-8 h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="lg:w-40 lg:h-4" />
          <Skeleton className="lg:w-24 lg:h-4" />
        </div>
      </div>
    </div>
  );
};

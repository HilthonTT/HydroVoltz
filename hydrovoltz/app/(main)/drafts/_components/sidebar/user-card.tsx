"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { User } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types";
import { useDraftSidebar } from "@/store/use-draft-sidebar";

interface UserCardProps {
  user: User;
  unseenMessages?: ExtendedMessage[];
}

export const UserCard = ({
  user: otherUser,
  unseenMessages = [],
}: UserCardProps) => {
  const params = useParams();

  const { collapsed } = useDraftSidebar((state) => state);

  const { username } = params!;
  const isCurrentUser = username === otherUser.username;

  const status =
    (otherUser?.status?.length as number) > 0
      ? otherUser?.status
      : "This user has no status.";

  const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
    return unseenMessage.senderId === otherUser.id;
  }).length;

  return (
    <Link href={`/chat/${otherUser.username}`}>
      <div
        role="button"
        className={cn(
          "group relative rounded-md bg-transparent hover:bg-secondary dark:hover:bg-secondary/80 transition mx-2 p-2",
          isCurrentUser ? "bg-secondary" : "bg-transparent"
        )}>
        <div className="flex items-center justify-between">
          <a href={`/chat/${otherUser.username}`}>
            <div className="flex items-center justify-center">
              <Hint label={otherUser.username} show={collapsed}>
                <UserAvatar
                  username={otherUser.username}
                  imageUrl={otherUser.imageUrl}
                  size="md"
                />
              </Hint>
              <div className={cn("text-sm ml-2", collapsed && "hidden")}>
                <p className="capitalize font-semibold">{otherUser.username}</p>
                <p
                  title={status || ""}
                  className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
                  {status}
                </p>
              </div>
            </div>
          </a>
          <div
            className={cn(
              "opacity-0 group-hover:opacity-100 transition",
              collapsed && "hidden"
            )}></div>
        </div>
        {unseenMessagesCount > 0 && (
          <div className="absolute top-0 -left-2">
            <Badge className="bg-black dark:bg-white">
              {unseenMessagesCount}
            </Badge>
          </div>
        )}
      </div>
    </Link>
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

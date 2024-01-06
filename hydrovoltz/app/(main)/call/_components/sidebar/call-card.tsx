"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { User } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { Hint } from "@/components/hint";
import { UserAvatar } from "@/components/user-avatar";
import { useCallSidebar } from "@/store/use-call-sidebar";
import { CallWithUser } from "@/types";
import { cn } from "@/lib/utils";

interface CallCardProps {
  call: CallWithUser;
  self: User;
}

export const CallCard = ({ call, self }: CallCardProps) => {
  const params = useParams();
  const { collapsed } = useCallSidebar((state) => state);

  const otherUser = self.id === call.userOneId ? call.userTwo : call.userOne;

  const { username } = params;
  const isCurrentUser = username === otherUser.username;

  return (
    <div
      role="button"
      className={cn(
        "group relative rounded-md bg-transparent hover:bg-secondary dark:hover:bg-secondary/80 transition mx-2 p-2",
        isCurrentUser ? "bg-secondary" : "bg-transparent"
      )}>
      <div className="flex items-center justify-between">
        <Link href={`/call/${otherUser.username}`}>
          <div className="flex items-center justify-center">
            <Hint label={otherUser.username} show={collapsed}>
              <UserAvatar
                username={otherUser.username}
                imageUrl={otherUser.imageUrl}
                size="md"
              />
            </Hint>
            <div className={cn("text-sm ml-2", collapsed && "hidden")}>
              <p className="capitalize font-semibold">
                {otherUser.username} {self?.id === otherUser?.id && "(You)"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const CallCardSkeleton = () => {
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

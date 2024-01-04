"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn, toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { ExtendedMessage } from "@/types";

import { UserCardOptions } from "./user-card-options";

interface UserCardProps {
  user: User;
  self: User;
}

export const UserCard = ({ user: otherUser, self }: UserCardProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { collapsed } = useChatSidebar((state) => state);

  const [unseenMessages, setUnseenMessages] = useState<ExtendedMessage[]>([]);

  const { username } = params!;
  const isCurrentUser = username === otherUser.username;

  const status =
    (otherUser?.status?.length as number) > 0
      ? otherUser?.status
      : "This user has no status.";

  const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
    return unseenMessage.senderId === otherUser.id;
  }).length;

  useEffect(() => {
    const chatChannel = toPusherKey(`user:${self.id}:chats`);
    const friendChannel = toPusherKey(`user:${self.id}:friends`);

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify = pathname !== `/chat/${message.senderName}`;

      if (!shouldNotify) {
        return;
      }

      toast.info(`${message.senderName} has sent you a message!`);
      setUnseenMessages((prev) => [...prev, message]);
    };

    const newFriendHandler = () => {
      router.refresh();
    };

    pusherClient.subscribe(chatChannel).bind("new_message", chatHandler);
    pusherClient.subscribe(friendChannel).bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(chatChannel);
      pusherClient.unsubscribe(friendChannel);

      pusherClient.unbind("new_message", chatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [pathname, router, self.id, setUnseenMessages]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
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
              <p className="capitalize font-semibold">
                {otherUser.username} {self?.id === otherUser?.id && "(You)"}
              </p>
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
          )}>
          <UserCardOptions user={otherUser} />
        </div>
      </div>
      {unseenMessagesCount > 0 && (
        <div className="absolute top-0 -left-2">
          <Badge className="bg-black dark:bg-white">
            {unseenMessagesCount}
          </Badge>
        </div>
      )}
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

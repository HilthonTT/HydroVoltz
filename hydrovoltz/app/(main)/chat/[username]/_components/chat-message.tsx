"use client";

import Image from "next/image";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { DirectMessage, User } from "@prisma/client";
import { toast } from "sonner";
import { Copy, CopyCheck, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useUserModal } from "@/store/use-user-modal";
import { useModal } from "@/store/use-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
  message: DirectMessage & { user: User };
  user: User;
}

export const ChatMessage = ({ message, user }: ChatMessageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { onOpen: onUserOpen } = useUserModal((state) => state);
  const { onOpen } = useModal((state) => state);

  const isOwner = user?.id === message?.user?.id;

  const onCopy = () => {
    if (!message.content || isCopied) {
      return;
    }

    navigator.clipboard.writeText(message.content);
    toast.success("Message copied to clipboard!");
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onDelete = () => {
    onOpen("deleteDirectMessage", { directMessage: message });
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-x-3 py-4 w-full",
        isOwner && "justify-end"
      )}>
      {isOwner && (
        <Button
          aria-label="Delete my message"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition mt-auto"
          size="icon"
          variant="ghost">
          <Trash className="w-4 h-4" />
        </Button>
      )}
      {!isOwner && (
        <button
          onClick={() => onUserOpen(message?.user)}
          className="w-auto h-auto rounded-full"
          aria-label={`Open ${message.user}'s profile`}>
          <UserAvatar
            username={message?.user?.username}
            imageUrl={message?.user?.imageUrl}
            size="lg"
          />
        </button>
      )}
      <div
        className={cn(
          "flex flex-col justify-center",
          isOwner ? "items-end" : "items-start"
        )}>
        <span className="text-sm font-semibold capitalize px-1">
          {message.user.username}
        </span>
        <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
          <p>{message.content}</p>
          {message.fileUrl && (
            <div className="relative aspect-video my-4 rounded-xl border outline-dashed outline-muted">
              <Image
                src={message.fileUrl}
                alt="Image"
                className="object-cover"
                fill
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      {isOwner && (
        <button
          onClick={() => onUserOpen(message?.user)}
          className="w-auto h-auto rounded-full"
          aria-label="Open my profile">
          <UserAvatar
            username={message?.user?.username}
            imageUrl={message?.user?.imageUrl}
            size="lg"
          />
        </button>
      )}
      {!isOwner && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost">
          {isCopied ? (
            <CopyCheck className="h-4 w-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  const isOwner = Math.random() < 0.5;

  return (
    <div
      className={cn(
        "group flex items-center gap-x-3 py-4 w-full",
        isOwner && "justify-end"
      )}>
      {!isOwner && <UserAvatarSkeleton size="lg" />}
      <div
        className={cn(
          "flex flex-col justify-center",
          isOwner ? "items-end" : "items-start"
        )}>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      {isOwner && (
        <button
          className="w-auto h-auto rounded-full"
          aria-label="Open my profile">
          <UserAvatarSkeleton size="lg" />
        </button>
      )}
    </div>
  );
};

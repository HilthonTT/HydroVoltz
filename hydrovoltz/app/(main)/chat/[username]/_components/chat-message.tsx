"use client";

import { useState } from "react";
import { DirectMessage, User } from "@prisma/client";
import { toast } from "sonner";
import { Copy, CopyCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: DirectMessage & { user: User };
  user: User;
}

export const ChatMessage = ({ message, user }: ChatMessageProps) => {
  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <div
      className={cn(
        "group flex items-center gap-x-3 py-4 w-full",
        isOwner && "justify-end"
      )}>
      {!isOwner && (
        <UserAvatar
          username={message?.user?.imageUrl}
          imageUrl={message?.user?.imageUrl}
          size="lg"
        />
      )}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {message.content}
      </div>
      {isOwner && (
        <UserAvatar
          username={message?.user?.imageUrl}
          imageUrl={message?.user?.imageUrl}
          size="lg"
        />
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

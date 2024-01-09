"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Copy, CopyCheck, Star } from "lucide-react";
import { Conversation, DirectMessage, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface MessageProps {
  message: DirectMessage & {
    conversation: Conversation & { userOne: User; userTwo: User };
  };
  self: User;
}

export const Message = ({ message, self }: MessageProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const otherUser =
    message.conversation.userOneId === self.id
      ? message.conversation.userTwo
      : message.conversation.userOne;

  const onCopy = () => {
    if (isCopied) {
      return;
    }

    setIsCopied(true);

    navigator.clipboard.writeText(message.content);
    toast.success("Message has been copied!");

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="bg-secondary rounded-lg px-3 py-1.5 relative">
      <div className="absolute -top-4 -left-3 mt-1 ml-1">
        <Star className="h-8 w-8 fill-yellow-500 stroke-yellow-500" />
      </div>
      <div className="flex items-center mt-0 w-full">
        <div className="relative">
          <UserAvatar
            username={otherUser.username}
            imageUrl={otherUser.imageUrl}
            size="md"
          />
        </div>
        <div title={message.content} className="break-words truncate ml-4">
          {message.content}
        </div>
        <div className="ml-auto flex flex-col space-y-3">
          <Hint label="Copy" side="right" asChild>
            <Button
              onClick={onCopy}
              aria-label="Copy"
              variant="ghost"
              className="w-auto h-auto">
              {isCopied ? (
                <CopyCheck className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </Hint>
          <Hint label="Go chat" side="right" asChild>
            <Button
              aria-label="Go chat"
              variant="ghost"
              className="w-auto h-auto"
              asChild>
              <a href={`/chat/${otherUser.username}`}>
                <ArrowRight className="h-6 w-6" />
              </a>
            </Button>
          </Hint>
        </div>
      </div>
      <div className="flex items-center justify-between mr-3 text-sm text-muted-foreground">
        <p>Conversation with {otherUser.username}</p>
        <p>
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

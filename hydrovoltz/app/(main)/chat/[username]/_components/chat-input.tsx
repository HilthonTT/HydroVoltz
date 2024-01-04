"use client";

import { ElementRef, KeyboardEvent, useRef, useState } from "react";
import { Loader2, MoreVertical, Send } from "lucide-react";
import { User } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { createDirectMessage } from "@/actions/create-direct-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { EmojiPicker } from "@/components/emoji-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePicker } from "@/components/file/file-picker";

interface ChatInputProps {
  user: User;
  conversationId: string;
}

export const ChatInput = ({ user, conversationId }: ChatInputProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const { execute, isLoading } = useAction(createDirectMessage, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return;
    }

    execute({ content, conversationId, userId: user.id, fileUrl });
    setContent("");
    setFileUrl("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mt-auto p-4 mb-2 relative">
      <div className="flex-1 overflow-hidden rounded-lg shadow-sm">
        <Textarea
          ref={textareaRef}
          id="content"
          placeholder={`Message ${user.username}...`}
          value={content}
          rows={1}
          onKeyDown={onKeyDown}
          className="block w-full resize-none"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="absolute top-10 right-20">
          <div className="flex-shrink-0">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="More options"
                  variant="ghost"
                  className="w-auto h-auto p-1">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[10px]">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="w-auto">
                  <EmojiPicker
                    onChange={(emoji: string) =>
                      setContent((prev) => `${prev} ${emoji}`)
                    }
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="w-auto">
                  <FilePicker
                    onChange={(imageUrl: string) => setFileUrl(imageUrl)}
                    isLoading={isLoading}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="absolute top-10 right-8">
          <div className="flex-shrink-0">
            <Button
              aria-label="Send message"
              disabled={isLoading}
              variant="ghost"
              className="w-auto h-auto p-1"
              type="submit"
              onClick={onSubmit}>
              {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
              {!isLoading && (
                <div className="p-0">
                  <Send className="h-6 w-6" />
                  <span className="sr-only">Send message</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatInputSkeleton = () => {
  return (
    <div className="mt-auto relative p-4 bottom-6">
      <div className="flex-1 overflow-hidden rounded-lg shadow-sm">
        <Skeleton className="w-full mt-2 block h-20" />
      </div>
    </div>
  );
};

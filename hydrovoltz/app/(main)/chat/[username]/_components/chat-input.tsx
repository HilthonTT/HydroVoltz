"use client";

import { ElementRef, KeyboardEvent, useEffect, useRef, useState } from "react";
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
import { getConversationDraftKey } from "@/lib/utils";

interface ChatInputProps {
  user: User;
  conversationId: string;
}

export const ChatInput = ({ user, conversationId }: ChatInputProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState<string>("");

  const { execute, isLoading } = useAction(createDirectMessage, {
    onSuccess: () => {
      setContent("");
      setFileUrl("");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    execute({ content, conversationId, userId: user.id, fileUrl });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleInputChange = (inputValue: string) => {
    const draftKey = getConversationDraftKey(conversationId);

    setContent(inputValue);
    localStorage.setItem(draftKey, inputValue);
  };

  useEffect(() => {
    const draftKey = getConversationDraftKey(conversationId);
    const savedDraft = localStorage.getItem(draftKey);

    if (savedDraft) {
      setContent(savedDraft);
    }
  }, [conversationId]);

  return (
    <div className="mt-auto p-4 mb-2 relative">
      <div className="flex-1 flex overflow-hidden rounded-lg shadow-sm space-x-2">
        <Textarea
          ref={textareaRef}
          id="content"
          placeholder={`Message ${user.username}...`}
          value={content}
          rows={1}
          onKeyDown={onKeyDown}
          className="block w-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="rounded-md border border-secondary flex-shrink-0 flex items-center">
          <Button
            aria-label="Send message"
            disabled={isLoading}
            variant="ghost"
            className="w-full h-full p-2"
            type="submit"
            onClick={onSubmit}>
            {isLoading && <Loader2 className="animate-spin h-6 w-6" />}
            {!isLoading && <Send className="h-6 w-6" />}
          </Button>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="More options"
                variant="ghost"
                className="w-full h-full p-2"
                disabled={isLoading}>
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
                  defaultValue={fileUrl}
                  isLoading={isLoading}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute top-10 right-20">
          <div className="flex-shrink-0"></div>
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

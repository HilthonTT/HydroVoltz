"use client";

import { ElementRef, KeyboardEvent, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { User } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { createDirectMessage } from "@/actions/create-direct-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  user: User;
  conversationId: string;
}

export const ChatInput = ({ user, conversationId }: ChatInputProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [content, setContent] = useState("");

  const { execute, isLoading } = useAction(createDirectMessage, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    if (content?.length === 0) {
      return;
    }

    execute({ content, conversationId });
    setContent("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mt-auto p-4 mb-2">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm">
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
      </div>
      <div className="absolute right-6 bottom-10 flex justify-between py-2 pl-3 pr-2">
        <div className="flex-shrink-0">
          <Button
            aria-label="Send message"
            disabled={isLoading}
            variant="ghost"
            className="w-auto h-auto"
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
  );
};

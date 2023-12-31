"use client";

import { ElementRef, useEffect, useRef } from "react";
import { User } from "@prisma/client";

interface ChatMessagesProps {
  user: User;
  messages: any[];
}

export const ChatMessages = ({ user, messages }: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <div ref={scrollRef} />
    </div>
  );
};

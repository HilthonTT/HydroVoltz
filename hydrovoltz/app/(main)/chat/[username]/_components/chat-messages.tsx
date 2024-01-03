"use client";

import { ElementRef, useRef, useState } from "react";
import { DirectMesssage, User } from "@prisma/client";

import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  user: User;
  initialMessages: (DirectMesssage & {
    user: User;
  })[];
}

export const ChatMessages = ({ user, initialMessages }: ChatMessagesProps) => {
  const scrollDownRef = useRef<ElementRef<"div">>(null);

  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="flex flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto max-h-[calc(100vh-6rem)] h-[85%]">
      <div ref={scrollDownRef} />
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};

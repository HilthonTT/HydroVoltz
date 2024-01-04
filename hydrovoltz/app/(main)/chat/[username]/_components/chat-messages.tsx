"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { DirectMessage, User } from "@prisma/client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

import { ChatMessage } from "./chat-message";

type DirectMessageWithUser = DirectMessage & {
  user: User;
};

interface ChatMessagesProps {
  user: User;
  initialMessages: DirectMessageWithUser[];
  conversationId: string;
}

export const ChatMessages = ({
  user,
  initialMessages,
  conversationId,
}: ChatMessagesProps) => {
  const scrollDownRef = useRef<ElementRef<"div">>(null);

  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${conversationId}`));

    const messageHandler = (message: DirectMessageWithUser) => {
      console.log("Message received!");
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming-messages", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${conversationId}`));
      pusherClient.unbind("incoming-messages", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto max-h-[calc(100vh-6rem)] h-[85%]">
      <div ref={scrollDownRef} />
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};

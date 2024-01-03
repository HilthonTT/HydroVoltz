"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "h-full flex-1",
        collapsed ? "ml-[100px]" : "ml-[100px] lg:ml-80",
        className
      )}>
      {children}
    </div>
  );
};

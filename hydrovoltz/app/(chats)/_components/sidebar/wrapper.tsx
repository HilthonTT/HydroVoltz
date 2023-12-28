"use client";

import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-20 bg-secondary z-[60] h-full"
      )}>
      {children}
    </aside>
  );
};

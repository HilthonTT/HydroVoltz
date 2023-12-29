"use client";

import { cn } from "@/lib/utils";

interface WidgetWrapperProps {
  children: React.ReactNode;
  collapsed: boolean;
}

export const WidgetWrapper = ({ children, collapsed }: WidgetWrapperProps) => {
  return (
    <aside
      className={cn(
        "fixed top-20 bg-secondary/30 w-[100px] lg:w-80 h-full z-[49]",
        collapsed && "lg:w-[100px]"
      )}>
      {children}
    </aside>
  );
};

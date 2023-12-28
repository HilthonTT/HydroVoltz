"use client";

interface WidgetWrapperProps {
  children: React.ReactNode;
}

export const WidgetWrapper = ({ children }: WidgetWrapperProps) => {
  return (
    <aside className="fixed bg-zinc-300 dark:bg-zinc-800/30 w-80 h-full z-50">
      {children}
    </aside>
  );
};

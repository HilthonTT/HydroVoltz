"use client";

interface WidgetWrapperProps {
  children: React.ReactNode;
}

export const WidgetWrapper = ({ children }: WidgetWrapperProps) => {
  return (
    <aside className="fixed bg-secondary/30 w-80 h-full z-50">{children}</aside>
  );
};

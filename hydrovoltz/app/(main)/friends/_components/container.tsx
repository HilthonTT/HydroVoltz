"use client";

import { Header } from "./header";

interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

export const Container = ({ children, label }: ContainerProps) => {
  return (
    <div className="w-full h-full p-8 space-y-4">
      <Header label={label} />
      {children}
    </div>
  );
};

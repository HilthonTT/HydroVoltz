"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
}

export const Logo = ({ className, showSlogan = true }: LogoProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-x-4">
      <div
        className={cn(
          "h-28 w-28 relative bg-white rounded-full border-2 border-gray-500 dark:border-0",
          className
        )}>
        <Image
          src="/logo.svg"
          alt="Logo"
          className="object-cover"
          priority
          fill
        />
      </div>
      <div className="hidden lg:block text-center">
        <p className="text-2xl font-semibold">HydroVoltz</p>
        {showSlogan && (
          <p className="text-muted-foreground text-sm">
            Chat with your friends!
          </p>
        )}
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className="hover:opacity-75 transition">
      <div className="relative flex items-center justify-center gap-x-4">
        <div
          className={cn(
            "h-16 w-16 relative bg-white rounded-full border-2 border-gray-500 dark:border-0",
            className
          )}>
          <Image
            src="./logo.svg"
            alt="Logo"
            className="object-cover"
            priority
            fill
          />
        </div>
      </div>
    </Link>
  );
};

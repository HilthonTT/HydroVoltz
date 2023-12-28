"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="hover:opacity-75 transition">
      <div className="relative flex items-center justify-center gap-x-4">
        <div className="h-16 w-16 relative bg-black dark:bg-white rounded-full">
          <Image src="./logo.svg" alt="Logo" className="object-cover" fill />
        </div>
        <div className="hidden lg:block">
          <p className="text-xl font-semibold">HydroVoltz</p>
          <p className="text-muted-foreground text-xs">
            Chat with your friends!
          </p>
        </div>
      </div>
    </Link>
  );
};

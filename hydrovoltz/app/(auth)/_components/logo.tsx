"use client";

import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-x-4">
      <div className="h-28 w-28 relative bg-black dark:bg-white rounded-full">
        <Image src="./logo.svg" alt="Logo" className="object-cover" fill />
      </div>
      <div className="hidden lg:block text-center">
        <p className="text-2xl font-semibold">HydroVoltz</p>
        <p className="text-muted-foreground text-sm">Chat with your friends!</p>
      </div>
    </div>
  );
};

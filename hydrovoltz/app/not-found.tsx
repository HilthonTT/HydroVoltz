"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <span className="text-muted-foreground ml-2 text-xl font-semibold">
          Page not found
        </span>
        <Button onClick={() => router.push("/")} variant="link">
          Go home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

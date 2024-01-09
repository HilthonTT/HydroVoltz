"use client";

import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const Error = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Frown className="h-8 w-8 animate-spin" />
        <span className="text-muted-foreground ml-2 text-xl font-semibold">
          Something went wrong
        </span>
        <Button onClick={() => router.push("/")} variant="link">
          Go home
        </Button>
      </div>
    </div>
  );
};

export default Error;

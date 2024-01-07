"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center space-y-4">
      <Loader2 className="animate-spin h-8 w-8" />
      <p className="text-muted-foreground">
        We are currently loading the call for you...
      </p>
    </div>
  );
};

export default Loading;

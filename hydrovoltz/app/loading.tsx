"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-muted-foreground ml-2 text-xl font-semibold">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;

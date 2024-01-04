"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { ContainerSkeleton } from "./_components/container";

const Loading = () => {
  return (
    <ContainerSkeleton>
      <div className="p-5">
        <Skeleton className="w-24 h-10" />
        <Separator className="my-4" />

        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-16" />
          ))}
        </div>
      </div>
    </ContainerSkeleton>
  );
};

export default Loading;

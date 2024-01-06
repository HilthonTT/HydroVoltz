"use client";

import { Call } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";

interface CallCardProps {
  call: Call;
}

export const CallCard = ({ call }: CallCardProps) => {
  return <div>Call</div>;
};

export const CallCardSkeleton = () => {
  return (
    <div className="mx-2 p-2">
      <div className="flex items-center justify-center gap-x-2">
        <Skeleton className="rounded-full lg:h-8 lg:w-8 h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="lg:w-40 lg:h-4" />
          <Skeleton className="lg:w-24 lg:h-4" />
        </div>
      </div>
    </div>
  );
};

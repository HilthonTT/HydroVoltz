"use client";

import { useUser } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";

import { RoutesBottom } from "./routes-bottom";
import { RoutesTops } from "./routes-top";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <SidebarSkeleton />;
  }

  return (
    <Wrapper>
      <RoutesTops />
      <RoutesBottom />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <Wrapper>
      <div className="flex flex-col space-y-5 mt-5">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="mx-auto p-2 w-10 h-10 bg-primary/20" />
        ))}
      </div>
      <div className="mt-auto pb-24">
        <div className="flex flex-col space-y-5 mt-5">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="mx-auto p-2 w-10 h-10 bg-primary/20" />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

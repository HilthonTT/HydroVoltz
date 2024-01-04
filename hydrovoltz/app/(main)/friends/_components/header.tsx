"use client";

import Link from "next/link";
import { Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AddFriendButton } from "./add-friend-button";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="bg-secondary rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <h1 className="flex items-center justify-center gap-x-2">
            <Users className="h-6 w-6" />
            <span className="font-semibold">{label}</span>
          </h1>
          <div className="space-x-3 ml-3">
            <Button className="h-auto w-auto" variant="ghost" asChild>
              <Link href="/friends">All</Link>
            </Button>
            <Button className="h-auto w-auto" variant="ghost" asChild>
              <Link href="/friends/pending">Pending</Link>
            </Button>
            <Button className="h-auto w-auto" variant="ghost" asChild>
              <Link href="/friends/added">Added</Link>
            </Button>
            <Button className="h-auto w-auto" variant="ghost" asChild>
              <Link href="/friends/blocked">Blocked</Link>
            </Button>
            <AddFriendButton />
          </div>
        </div>
        <div>
          <Link href="/chat">
            <Button asChild variant="ghost" className="h-auto w-auto">
              <div>
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="space-x-3 flex items-center">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-20" />
        ))}
      </div>
      <div>
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};

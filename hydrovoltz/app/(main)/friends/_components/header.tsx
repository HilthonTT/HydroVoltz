"use client";

import Link from "next/link";
import { Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { AddFriendButton } from "./add-friend-button";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="bg-secondary rounded-lg p-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="flex items-center justify-center gap-x-2 mb-3 md:mb-0">
          <Users className="h-6 w-6" />
          <span className="font-semibold">{label}</span>
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start">
          <Button
            className="h-auto w-auto mb-2 md:mb-0 md:mr-3"
            variant="ghost"
            asChild>
            <a href="/friends">All</a>
          </Button>
          <Button
            className="h-auto w-auto mb-2 md:mb-0 md:mr-3"
            variant="ghost"
            asChild>
            <a href="/friends/pending">Pending</a>
          </Button>
          <Button
            className="h-auto w-auto mb-2 md:mb-0 md:mr-3"
            variant="ghost"
            asChild>
            <a href="/friends/added">Added</a>
          </Button>
          <Button
            className="h-auto w-auto mb-2 md:mb-0 md:mr-3"
            variant="ghost"
            asChild>
            <a href="/friends/blocked">Blocked</a>
          </Button>
          <AddFriendButton />
        </div>
        <div className="md:block md:relative">
          <div className="absolute right-6 top-[7rem] md:static md:top-auto md:right-auto">
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

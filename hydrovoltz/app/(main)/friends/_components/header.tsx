"use client";

import qs from "query-string";
import Link from "next/link";
import { Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AddFriendButton } from "./add-friend-button";

export const Header = () => {
  const router = useRouter();

  const onClick = (type: string | null) => {
    const url = qs.stringifyUrl(
      {
        url: "/friends",
        query: {
          type,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="bg-secondary rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <h1 className="flex items-center justify-center gap-x-2">
            <Users className="h-6 w-6" />
            <span className="font-semibold">Friends</span>
          </h1>
          <div className="space-x-3 ml-3">
            <Button
              onClick={() => onClick("")}
              className="h-auto w-auto"
              variant="ghost">
              All
            </Button>
            <Button
              onClick={() => onClick("pending")}
              className="h-auto w-auto"
              variant="ghost">
              Pending
            </Button>
            <Button
              onClick={() => onClick("blocked")}
              className="h-auto w-auto"
              variant="ghost">
              Blocked
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

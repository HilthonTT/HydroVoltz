"use client";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { MoreVertical } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/chat/${user.id}`);
  };

  return (
    <div
      role="button"
      onClick={onClick}
      className="group rounded-md bg-transparent hover:bg-secondary transition mx-2 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <UserAvatar
            username={user.username}
            imageUrl={user.imageUrl}
            size="md"
          />
          <div className="text-sm ml-2">
            <p className="capitalize font-semibold">{user.username}</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition">
          <Hint label="Options" side="right">
            <Button className="h-auto w-auto" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </div>
  );
};

"use client";

import { Friend, User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";

import { DeleteFriendButton } from "./delete-friend-button";

interface FriendCardProps {
  friend: Friend & {
    initiator: User;
    friend: User;
  };
  self: User;
}

export const FriendCard = ({ friend, self }: FriendCardProps) => {
  const otherUser =
    friend.initiator.id === self.id ? friend.friend : friend.initiator;

  const status =
    (otherUser.status?.length as number) > 0
      ? otherUser.status
      : "This user has no status.";

  return (
    <div className="bg-secondary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={otherUser?.username}
          imageUrl={otherUser.imageUrl}
          size="lg"
        />
        <div className="space-y-1">
          <p className="capitalize font-semibold truncate">
            {otherUser.username}
          </p>
          <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[300px]">
            {status}
          </p>
        </div>
      </div>
      <DeleteFriendButton id={friend.id} self={self} />
    </div>
  );
};

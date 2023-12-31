"use client";

import { X } from "lucide-react";
import { User } from "@prisma/client";
import { toast } from "sonner";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import { Hint } from "@/components/hint";
import { useAction } from "@/hooks/use-action";
import { deleteFriendRequest } from "@/actions/delete-friend-request";

interface RequestCardProps {
  request: FriendRequestWithReceiverAndSender;
  self: User;
}

export const RequestCard = ({ request, self }: RequestCardProps) => {
  const otherUser =
    request.sender.id === self.id ? request.receiver : request.sender;

  const { execute, isLoading } = useAction(deleteFriendRequest, {
    onSuccess: () => {
      toast.success("Canceled friend request");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCancel = () => {
    execute({ id: request.id });
  };

  return (
    <div className="bg-secondary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={otherUser.username}
          imageUrl={otherUser.imageUrl}
          size="lg"
        />
        <div className="space-y-1">
          <p className="capitalize font-semibold truncate">
            {otherUser.username}
          </p>
          <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[300px]">
            {request?.status}
          </p>
        </div>
      </div>
      <div>
        <Hint label="Cancel" asChild>
          <Button
            onClick={onCancel}
            variant="ghost"
            className="h-auto w-auto"
            disabled={isLoading}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cancel</span>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

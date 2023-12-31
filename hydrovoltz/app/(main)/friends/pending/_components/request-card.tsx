"use client";

import { Verified, X } from "lucide-react";
import { toast } from "sonner";

import { FriendRequestWithReceiverAndSender } from "@/types";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { useAction } from "@/hooks/use-action";
import { acceptFriendRequest } from "@/actions/accept-friend-request";
import { declineFriendRequest } from "@/actions/decline-friend-request";
import { Hint } from "@/components/hint";

interface RequestCardProps {
  request: FriendRequestWithReceiverAndSender;
  onAction: (id: string) => void;
}

export const RequestCard = ({ request, onAction }: RequestCardProps) => {
  const { execute: executeAccept, isLoading: isAcceptLoading } = useAction(
    acceptFriendRequest,
    {
      onSuccess: () => {
        toast.success("Friend request accepted!");
        onAction(request.id);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDecline, isLoading: isDeclineLoading } = useAction(
    declineFriendRequest,
    {
      onSuccess: () => {
        toast.success("Friend request declined!");
        onAction(request.id);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onAccept = () => {
    executeAccept({ id: request.id });

    toast.success("Friend request accepted!");
    onAction(request.id);
  };

  const onDecline = () => {
    executeDecline({ id: request.id });

    toast.success("Friend request declined!");
    onAction(request.id);
  };

  const isLoading = isDeclineLoading || isAcceptLoading;

  return (
    <div className="bg-secondary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={request?.sender?.username}
          imageUrl={request?.sender?.imageUrl}
          size="lg"
        />
        <div className="space-y-1">
          <p className="capitalize font-semibold truncate">
            {request?.sender?.username}
          </p>
          <p className="text-xs text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[300px]">
            {request?.status}
          </p>
        </div>
      </div>
      <div className="space-x-2">
        <Hint label="Accept" asChild>
          <Button
            onClick={onAccept}
            variant="ghost"
            className="h-auto w-auto"
            disabled={isLoading}>
            <Verified className="h-5 w-5" />
            <span className="sr-only">Accept</span>
          </Button>
        </Hint>
        <Hint label="Decline" asChild>
          <Button
            onClick={onDecline}
            variant="ghost"
            className="h-auto w-auto"
            disabled={isLoading}>
            <X className="h-5 w-5" />
            <span className="sr-only">Decline</span>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

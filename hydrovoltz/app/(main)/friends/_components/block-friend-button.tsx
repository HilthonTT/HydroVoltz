"use client";

import { User } from "@prisma/client";
import { XOctagon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { blockUser } from "@/actions/block-user";

interface BlockFriendButtonProps {
  id: string;
  username: string;
  self: User;
}

export const BlockFriendButton = ({
  id,
  self,
  username,
}: BlockFriendButtonProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const { execute, isLoading } = useAction(blockUser, {
    onSuccess: () => {
      toast.success(`${username} has been blocked`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlock = () => {
    execute({ userId: id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full h-auto p-1">
          <XOctagon className="h-6 w-6 mr-auto" />
          <span className="font-semibold">Block Friend</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">Block {username}?</DialogTitle>
          <DialogDescription>
            You will no longer be friends with this user and this user
            won&apos;t be able to send anymore friend requests
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <DialogClose ref={closeRef}>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={onBlock}>
            Block
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

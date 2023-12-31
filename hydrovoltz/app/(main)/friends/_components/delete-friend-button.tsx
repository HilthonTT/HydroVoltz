"use client";

import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { deleteFriend } from "@/actions/delete-friend";

interface DeleteFriendButtonProps {
  id: string;
  self: User;
}

export const DeleteFriendButton = ({ id, self }: DeleteFriendButtonProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const { execute, isLoading } = useAction(deleteFriend, {
    onSuccess: (data) => {
      const otherUser =
        data.initiator.id === self.id ? data.friend : data.initiator;

      toast.success(`You are no longer friends with "${otherUser.username}"`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    execute({ id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto">
          <X className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove friend?</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button disabled={isLoading} type="button" variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isLoading}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

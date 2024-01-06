"use client";

import { ElementRef, useRef } from "react";
import { User } from "@prisma/client";
import { BadgeCheck } from "lucide-react";
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
import { Hint } from "@/components/hint";
import { unblockUser } from "@/actions/unblock-user";

interface UnblockButtonProps {
  user: User;
}

export const UnblockButton = ({ user }: UnblockButtonProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const { execute, isLoading } = useAction(unblockUser, {
    onSuccess: (data) => {
      toast.success(`${data.blocked.username} has been unblocked`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      onClose();
    },
  });

  const unBlock = () => {
    execute({ userId: user.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label={`Unblock ${user.username}`}
          variant="ghost"
          className="w-auto h-auto">
          <Hint label={`Unblock ${user.username}`} asChild>
            <div>
              <BadgeCheck className="h-6 w-6" />
              <span className="sr-only">Unblock {user.username}</span>
            </div>
          </Hint>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate capitalize">
            Unblock {user?.username}?
          </DialogTitle>
          <DialogDescription>
            This user will able to friend you again.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button disabled={isLoading} variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={unBlock}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-500">
            Unblock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

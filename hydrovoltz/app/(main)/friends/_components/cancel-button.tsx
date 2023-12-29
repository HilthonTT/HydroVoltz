"use client";

import { ElementRef, useRef } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { deleteFriendRequest } from "@/actions/delete-friend-request";

interface CancelButtonProps {
  userId: string;
}

export const CancelButton = ({ userId }: CancelButtonProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const { execute } = useAction(deleteFriendRequest, {
    onSuccess: () => {
      toast.success("Friend request canceled!");
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    execute({ userId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto">
          <Hint label="Cancel Request">
            <Trash className="h-5 w-5" />
          </Hint>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel request?</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-5">
          <div className="flex items-center justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button variant="ghost" type="button">
                Close
              </Button>
            </DialogClose>
            <FormSubmit className="h-auto w-auto">Cancel Request</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

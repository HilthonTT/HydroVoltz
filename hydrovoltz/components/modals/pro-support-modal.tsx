"use client";

import { toast } from "sonner";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { useAction } from "@/hooks/use-action";
import { useModal } from "@/store/use-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const ProSupportModal = () => {
  const { isOpen, type, onClose } = useModal((state) => state);

  const isModalOpen = isOpen && type === "proSupport";

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mt-2 p-1 overflow-hidden">
        <Logo showSlogan={false} />
        <div className="mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Support HydroVoltz!</h2>
          <p className="text-xs font-semibold">
            You will be supporting the developper for his hard work!
          </p>

          <Button onClick={onClick} disabled={isLoading} className="w-full">
            Support
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

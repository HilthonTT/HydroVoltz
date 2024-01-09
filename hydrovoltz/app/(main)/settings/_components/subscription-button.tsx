"use client";

import { toast } from "sonner";
import { CalendarCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/use-modal";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";

interface SubscriptionButtonProps {
  isSubscribed: boolean;
}

export const SubscriptionButton = ({
  isSubscribed,
}: SubscriptionButtonProps) => {
  const { onOpen } = useModal((state) => state);

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCheckSupport = () => {
    execute({});
  };

  const onSupportNow = () => {
    onOpen("proSupport");
  };

  return (
    <>
      {isSubscribed ? (
        <Button onClick={onCheckSupport} disabled={isLoading}>
          <CalendarCheck className="h-6 w-6 mr-2" />
          <span>Check Support</span>
        </Button>
      ) : (
        <Button onClick={onSupportNow} disabled={isLoading}>
          <Sparkles className="h-6 w-6 mr-2" />
          <span>Support now</span>
        </Button>
      )}
    </>
  );
};

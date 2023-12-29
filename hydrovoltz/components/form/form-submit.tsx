"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "pending";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      type="submit"
      disabled={disabled || pending}
      variant={variant}>
      {children}
    </Button>
  );
};

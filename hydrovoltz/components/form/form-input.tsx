"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      fullWidth = false,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        <div className="space-y-1">
          {label && (
            <Label htmlFor={id} className="text-xs font-semibold text-primary">
              {label}
            </Label>
          )}
          <Input
            ref={ref}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            defaultValue={defaultValue}
            name={id}
            id={id}
            required={required}
            disabled={pending || disabled}
            className={cn(className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

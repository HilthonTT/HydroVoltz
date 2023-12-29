"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  asChild?: boolean;
  align?: "start" | "center" | "end";
  show?: boolean;
}

export const Hint = ({
  label,
  children,
  side,
  asChild,
  align,
  show = true,
}: HintProps) => {
  return (
    <>
      {show ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
            <TooltipContent
              className="text-black bg-white"
              side={side}
              align={align}>
              <p className="font-semibold">{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

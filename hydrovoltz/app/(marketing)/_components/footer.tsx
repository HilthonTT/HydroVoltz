"use client";

import { Glasses, HardHat } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Logo } from "./navbar/logo";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 bg-secondary">
      <div className="flex items-center justify-between w-full">
        <Logo className="h-10 w-10" />
        <div className="flex items-center justify-between space-x-4 transition">
          <Button
            variant="ghost"
            size="sm"
            className="hover:opacity-75 transition">
            <Glasses className="mr-2 h-6 w-6" />
            <span className="text-muted-foreground text-xs">
              Privacy Policy
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:opacity-75 transition">
            <HardHat className="mr-2 h-6 w-6" />
            <span className="text-muted-foreground text-xs">
              Terms of Service
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

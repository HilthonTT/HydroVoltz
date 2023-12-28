"use client";

import { Glasses, Hammer, HardHat } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 w-full p-4 bg-secondary">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center text-muted-foreground gap-x-2">
          <Hammer className="h-4 w-4" />
          <p className="text-xs hidden lg:block">
            @{currentYear} HydroVoltz Corporation. HydroVoltz is amongst our
            registered and unregistered trademarks in Europe.
          </p>
        </div>
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

"use client";

import Link from "next/link";
import { Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="bg-secondary rounded-lg p-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="flex items-center justify-center gap-x-2 mb-3 md:mb-0">
          <Users className="h-6 w-6" />
          <span className="font-semibold truncate">{label}</span>
        </h1>

        <div className="md:block md:relative">
          <div className="absolute right-6 top-[7rem] md:static md:top-auto md:right-auto">
            <Link href="/chat">
              <Button asChild variant="ghost" className="h-auto w-auto">
                <div>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

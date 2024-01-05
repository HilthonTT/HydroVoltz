"use client";

import Link from "next/link";

import { Hint } from "@/components/hint";

interface RouteProps {
  label: string;
  href: string;
  children: React.ReactNode;
}

export const Route = ({ label, href, children }: RouteProps) => {
  return (
    <Link
      href={href}
      className="relative rounded-md hover:bg-zinc-600 transition p-2 mx-auto">
      <div className="flex justify-center items-center">
        <Hint label={label} side="right">
          <div>{children}</div>
        </Hint>
      </div>
    </Link>
  );
};

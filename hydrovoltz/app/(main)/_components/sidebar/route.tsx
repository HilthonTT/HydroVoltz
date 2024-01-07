"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface RouteProps {
  label: string;
  href: string;
  children: React.ReactNode;
}

export const Route = ({ label, href, children }: RouteProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition p-2 mx-auto",
        pathname.includes(href) && "bg-zinc-300 dark:bg-zinc-600"
      )}>
      <div className="flex justify-center items-center">
        <Hint label={label} side="right">
          <div>{children}</div>
        </Hint>
      </div>
    </Link>
  );
};

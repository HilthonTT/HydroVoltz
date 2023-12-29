"use client";

import { MessageSquareText, Pencil, PhoneCall, Users } from "lucide-react";

import { Route } from "./route";

export const RoutesTops = () => {
  const routes = [
    {
      icon: MessageSquareText,
      href: "/chat",
      label: "Chat",
    },
    {
      icon: Users,
      href: "/friends",
      label: "Friends",
    },
    {
      icon: PhoneCall,
      href: "/call",
      label: "Call",
    },
    {
      icon: Pencil,
      href: "/drafts",
      label: "Drafts",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 mt-5">
      {routes?.map(({ href, icon: Icon, label }) => (
        <Route key={href} href={href} label={label}>
          <Icon className="h-6 w-6" />
        </Route>
      ))}
    </div>
  );
};

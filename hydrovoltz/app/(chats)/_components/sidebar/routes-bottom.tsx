"use client";

import { Settings, Star } from "lucide-react";

import { Route } from "./route";

export const RoutesBottom = () => {
  const routes = [
    {
      icon: Star,
      href: "/starred-messages",
      label: "Starred Messages",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  return (
    <div className="mt-auto pb-24">
      <div className="flex flex-col space-y-5 mt-5">
        {routes?.map(({ href, icon: Icon, label }) => (
          <Route key={href} href={href} label={label}>
            <Icon className="h-6 w-6" />
          </Route>
        ))}
      </div>
    </div>
  );
};

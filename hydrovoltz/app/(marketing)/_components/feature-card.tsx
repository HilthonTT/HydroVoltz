"use server";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  label: string;
  icon: LucideIcon;
}

export const FeatureCard = ({ label, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="bg-secondary rounded-2xl p-6 flex items-center gap-x-2">
      <div className="relative">
        <Icon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

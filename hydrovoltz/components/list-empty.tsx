"use client";

import Image from "next/image";

interface EmptyListProps {
  label: string;
}

export const EmptyList = ({ label }: EmptyListProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative h-40 w-40 bg-white rounded-full">
        <Image
          src="/empty-folder.svg"
          alt="Empty"
          fill
          className="object-cover p-4"
        />
      </div>
      <p className="text-sm text-muted-foreground truncate">{label}</p>
    </div>
  );
};

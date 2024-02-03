import React from "react";

type Props = {
  title?: string;
  label: string;
};

export function Header({ title, label }: Props) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {title && <h1 className="text-3xl font-semibold">{title}</h1>}
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

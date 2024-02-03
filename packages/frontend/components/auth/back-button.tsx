"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};
export function BackButton({ label, href }: Props) {
  return (
    <Button
      variant="link"
      className="w-full font-normal text-[13px]"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

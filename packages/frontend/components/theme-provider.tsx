"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [resolvedTheme]);
  if (!isMounted) {
    return null;
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(() => import("@/components/theme-provider"), {
  ssr: true,
});
import DarkModeButton from "@/components/DarkModeButton";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Jamali Pay - Best payment gateway solution for SaaS Business",
  description:
    "We support all banks in the world, except for Israel banks, and offer secure, fast payment options for cryptocurrencies and e-wallets.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="font-thicccboi font-medium">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <DarkModeButton />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

"use client";
import {
  AuthLoading,
  Authenticated,
  ConvexProviderWithAuth,
  ConvexReactClient,
} from "convex/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface ConvexClientProps {
  children?: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);
export const ConvexClientProvider = ({ children }: ConvexClientProps) => {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
};

function useAuthFromNextAuth() {
  const session = useSession();
  return useMemo(
    () => ({
      isLoading: session.status === "loading",
      isAuthenticated: session.status === "authenticated",
      fetchAccessToken: () => session.data?.accessToken,
    }),
    [session.status, session.data]
  );
}

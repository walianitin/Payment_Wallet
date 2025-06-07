"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

// provider.tsx
// Look for any conditional rendering that might unmount components abruptly
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </SessionProvider>
  );
}
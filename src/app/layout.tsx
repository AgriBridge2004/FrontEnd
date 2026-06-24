import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriBridge",
  description: "A trusted digital marketplace connecting farmers with commercial buyers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="ltr" lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriBridge",
  description:
    "منصة رقمية موثوقة تربط المزارعين بالمشترين التجاريين.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="rtl" lang="ar">
      <body>{children}</body>
    </html>
  );
}

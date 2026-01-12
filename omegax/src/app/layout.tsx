import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmegaX",
  description:
    "OmegaX is a real-time anonymous chat platform for random text and video conversations, built using Next.js 16.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{ children}</body>
    </html>
  );
}

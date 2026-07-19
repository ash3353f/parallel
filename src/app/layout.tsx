import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallel | Simulate Tomorrow",
  description:
    "Parallel is an AI-powered Digital Twin platform for simulating business decisions before making them in the real world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

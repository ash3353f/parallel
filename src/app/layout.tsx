import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallel | Simulate Tomorrow",
  description:
    "AI-powered Digital Twin platform for simulating business decisions before making them in the real world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light h-full scroll-smooth antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900 selection:bg-cyan-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}

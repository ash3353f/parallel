import * as React from "react";

import { cn } from "@/lib/utils";

export function PageContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <main className={cn("mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 sm:px-8 lg:px-10", className)} {...props} />;
}

export function SectionContainer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props} />;
}

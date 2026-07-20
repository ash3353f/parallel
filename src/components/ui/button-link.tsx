import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonLinkVariant;
};

const buttonLinkVariants: Record<ButtonLinkVariant, string> = {
  primary:
    "border border-transparent bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]",
  secondary:
    "border border-solid border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:border-transparent hover:bg-[var(--color-action-secondary-hover)]",
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-full)] px-[var(--space-5)] transition-colors md:w-[158px]",
        buttonLinkVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

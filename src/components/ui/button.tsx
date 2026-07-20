import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-accent text-background shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_rgba(56,189,248,0.16)] hover:bg-accent/90",
  secondary:
    "border-border bg-surface text-foreground hover:border-white/14 hover:bg-card",
  ghost: "border-transparent bg-transparent text-muted-foreground hover:bg-surface hover:text-foreground",
  danger: "border-transparent bg-danger text-white hover:bg-danger/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 rounded-xl px-3 text-xs",
  md: "h-11 gap-2.5 rounded-2xl px-4 text-sm",
  lg: "h-13 gap-3 rounded-2xl px-6 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap border font-medium tracking-[-0.01em] transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45",
        "active:translate-y-px",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

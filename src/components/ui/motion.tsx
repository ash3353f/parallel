"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { subtleMotion } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function MotionContainer({ className, ...props }: HTMLMotionProps<"div">) {
  return <motion.div className={cn(className)} {...subtleMotion} {...props} />;
}

import * as React from "react";
import { cn } from "@/lib/utils";

export const badgeStyles = {
  defaults:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  focus: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    danger: "border-transparent bg-danger text-danger-foreground hover:bg-danger/80",
    outline: "text-foreground",
  },
};

export type BadgeStyleProps = {
  variant?: keyof typeof badgeStyles.variants;
  className?: string;
};

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & BadgeStyleProps;

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeStyles.defaults,
        badgeStyles.focus,
        badgeStyles.variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

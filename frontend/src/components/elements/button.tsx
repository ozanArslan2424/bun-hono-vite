import { cn } from "@/lib/utils";
import * as React from "react";

export const buttonStyles = {
  defaults:
    "inline-flex border items-center justify-center whitespace-nowrap font-medium transition rounded-md",
  focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  disabled: "disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-primary text-primary-foreground border-primary hover:opacity-90 active:opacity-80",
    secondary:
      "bg-secondary text-secondary-foreground border-secondary hover:opacity-90 active:opacity-80",
    accent: "bg-accent text-accent-foreground border-accent hover:opacity-90 active:opacity-80",
    muted: "bg-muted text-muted-foreground border-muted hover:opacity-90 active:opacity-80",
    danger: "bg-danger text-danger-foreground border-danger hover:opacity-90 active:opacity-80",
    warning: "bg-warning text-warning-foreground border-warning hover:opacity-90 active:opacity-80",
    success: "bg-success text-success-foreground border-success hover:opacity-90 active:opacity-80",
    outline: "bg-background border-border hover:bg-secondary/90 active:bg-secondary/80",
    ghost:
      "bg-transparent text-foreground border-transparent hover:bg-secondary/90 active:bg-secondary/80",
    text: "hover:text-foreground text-muted-foreground border-transparent",
  },
  size: {
    default: "h-10 px-3 py-1.5 gap-2 text-sm",
    xs: "h-7 px-2 gap-2 text-xs",
    sm: "h-9 px-3 gap-3 text-sm",
    lg: "h-11 px-8 gap-6 text-base",
    icon: "h-9 w-9 text-sm aspect-square",
    text: "gap-2 p-0 font-medium",
  },
};

export type ButtonStyleProps = {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.size;
  className?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = "default", size = "default", className, children, ...rest } = props;
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        buttonStyles.defaults,
        buttonStyles.variants[variant],
        buttonStyles.size[size],
        buttonStyles.focus,
        buttonStyles.disabled,
        className
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

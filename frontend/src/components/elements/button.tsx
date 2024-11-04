import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import * as React from "react";

// export const buttonVariants = cva(
//   "inline-flex border items-center bg-opacity-100 justify-center whitespace-nowrap font-semibold transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground border-primary hover:bg-primary/90 active:bg-primary/80",
//         danger:
//           "bg-secondary text-secondary-foreground border-secondary hover:bg-danger hover:border-danger hover:text-danger-foreground",
//         outline:
//           "bg-background hover:bg-secondary border-border hover:text-secondary-foreground hover:bg-secondary/50 active:bg-secondary/30",
//         secondary:
//           "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90 active:bg-secondary/70",
//         ghost:
//           "hover:bg-secondary hover:text-secondary-foreground border-transparent hover:bg-secondary/50 active:bg-secondary/30",
//       },
//       size: {
//         default: "h-10 px-4 py-2 gap-4 text-sm",
//         xs: "h-7 rounded-md px-2 gap-2 text-xs",
//         sm: "h-9 rounded-md px-3 gap-3 text-sm",
//         lg: "h-11 rounded-md px-8 gap-8 text-base",
//         icon: "h-9 w-9 text-sm",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

export const buttonStyles = {
  defaults: "inline-flex border items-center justify-center whitespace-nowrap font-medium transition rounded-md",
  focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  disabled: "disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-primary text-primary-foreground border-primary hover:opacity-90 active:opacity-80",
    secondary: "bg-secondary text-secondary-foreground border-secondary hover:opacity-90 active:opacity-80",
    accent: "bg-accent text-accent-foreground border-accent hover:opacity-90 active:opacity-80",
    muted: "bg-muted text-muted-foreground border-muted hover:opacity-90 active:opacity-80",
    danger: "bg-danger text-danger-foreground border-danger hover:opacity-90 active:opacity-80",
    warning: "bg-warning text-warning-foreground border-warning hover:opacity-90 active:opacity-80",
    success: "bg-success text-success-foreground border-success hover:opacity-90 active:opacity-80",
    outline: "bg-background border-border hover:bg-secondary/90 active:bg-secondary/80",
    ghost: "bg-transparent text-foreground border-transparent hover:bg-secondary/90 active:bg-secondary/80",
  },
  size: {
    default: "h-10 px-3 py-1.5 gap-2 text-sm",
    xs: "h-7 px-2 gap-2 text-xs",
    sm: "h-9 px-3 gap-3 text-sm",
    lg: "h-11 px-8 gap-6 text-base",
    icon: "h-9 w-9 text-sm aspect-square",
  },
};

export type ButtonStyleProps = {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.size;
  className?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps & {
    pending?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = "default", size = "default", className, pending = false, children, ...rest } = props;
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        buttonStyles.defaults,
        buttonStyles.focus,
        buttonStyles.disabled,
        buttonStyles.variants[variant],
        buttonStyles.size[size],
        className
      )}
      disabled={pending ?? props.disabled}
    >
      {pending && <LoaderIcon className="animate-spin" size={16} />} {children}
    </button>
  );
});

Button.displayName = "Button";

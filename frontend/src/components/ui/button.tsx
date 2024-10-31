import { iconSizes } from "@/lib/config";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import * as React from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-opacity-90 active:bg-opacity-80",
        destructive: "bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "border bg-background hover:bg-secondary hover:text-secondary-foreground hover:bg-opacity-50 active:bg-opacity-30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-opacity-90 active:bg-opacity-70",
        ghost: "hover:bg-secondary hover:text-secondary-foreground hover:bg-opacity-50 active:bg-opacity-30",
      },
      size: {
        default: "h-10 px-4 py-2 gap-4 text-sm",
        sm: "h-9 rounded-md px-3 gap-3 text-sm",
        lg: "h-11 rounded-md px-8 gap-8 text-base",
        icon: "h-9 w-9 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    isPending?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isPending, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isPending ?? props.disabled}
        {...props}
      >
        {isPending ? <LoaderIcon className="animate-spin" size={iconSizes.sm} /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

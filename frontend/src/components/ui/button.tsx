import { iconSizes } from "@/lib/config";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import * as React from "react";

export const buttonVariants = cva(
  "inline-flex border items-center bg-opacity-100 justify-center whitespace-nowrap font-semibold transition-all rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-destructive hover:border-destructive hover:text-destructive-foreground",
        outline:
          "bg-background hover:bg-secondary border-border hover:text-secondary-foreground hover:bg-secondary/50 active:bg-secondary/30",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90 active:bg-secondary/70",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground border-transparent hover:bg-secondary/50 active:bg-secondary/30",
      },
      size: {
        default: "h-10 px-4 py-2 gap-4 text-sm",
        xs: "h-7 rounded-md px-2 gap-2 text-xs",
        sm: "h-9 rounded-md px-3 gap-3 text-sm",
        lg: "h-11 rounded-md px-8 gap-8 text-base",
        icon: "h-9 w-9 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);

Button.displayName = "Button";

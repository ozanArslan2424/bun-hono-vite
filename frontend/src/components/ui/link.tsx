import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { Link as DOMLink, useLocation } from "react-router-dom";

export type LinkProps = React.ComponentPropsWithoutRef<typeof DOMLink> &
  VariantProps<typeof buttonVariants> & {
    asButton?: boolean;
    activeclassname?: string;
    children?: React.ReactNode;
  };

const Link = React.forwardRef<React.ElementRef<typeof DOMLink>, LinkProps>((props, ref) => {
  const { asButton, children, variant, size, ...rest } = props;
  const location = useLocation();

  const isActive = location.pathname === props.to;
  const className = props.className + " " + (isActive ? props.activeclassname : "");

  return (
    <DOMLink {...rest} className={cn(asButton ? buttonVariants({ variant, size, className }) : className)} ref={ref}>
      {children}
    </DOMLink>
  );
});

Link.displayName = "Link";

export default Link;

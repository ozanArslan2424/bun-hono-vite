import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createLink, LinkComponent, useLocation } from "@tanstack/react-router";
import { VariantProps } from "class-variance-authority";
import React from "react";

export type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    asButton?: boolean;
    activeclassname?: string;
    children?: React.ReactNode;
  };

const BasicLink = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  const { asButton, children, variant, size, ...rest } = props;
  const location = useLocation();

  const isActive = location.pathname === props.href;
  const className = props.className + " " + (isActive ? props.activeclassname : "");

  return (
    <a {...rest} className={cn(asButton ? buttonVariants({ variant, size, className }) : className)} ref={ref}>
      {children}
    </a>
  );
});

const CreatedLink = createLink(BasicLink);

const Link: LinkComponent<typeof BasicLink> = (props) => {
  return <CreatedLink {...props} />;
};

export default Link;

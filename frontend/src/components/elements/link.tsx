import { cn } from "@/lib/utils";
import React from "react";
import { ButtonStyleProps, buttonStyles } from "../elements/button";
import { Link as DOMLink } from "react-router-dom";

export type LinkProps = React.ComponentPropsWithoutRef<typeof DOMLink> &
  ButtonStyleProps & {
    asButton?: boolean;
    activeclassname?: string;
    children?: React.ReactNode;
  };

export type LinkRef = React.ComponentRef<typeof DOMLink>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { asButton, variant = "default", size = "default", className, ...rest } = props;

  return (
    <DOMLink
      {...rest}
      className={
        asButton
          ? cn(
              buttonStyles.defaults,
              buttonStyles.focus,
              buttonStyles.variants[variant],
              buttonStyles.size[size],
              className
            )
          : className
      }
      ref={ref}
    />
  );
});

export default Link;

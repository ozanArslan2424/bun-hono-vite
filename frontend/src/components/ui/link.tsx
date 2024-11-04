import { cn } from "@/lib/utils";
import { createLink, LinkComponent } from "@tanstack/react-router";
import React from "react";
import { ButtonStyleProps, buttonStyles } from "./button";

export type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & {
    asButton?: boolean;
    activeclassname?: string;
    children?: React.ReactNode;
  };

const BasicLink = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  const { asButton, variant = "default", size = "default", className, ...rest } = props;

  return (
    <a
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

const CreatedLink = createLink(BasicLink);

const Link: LinkComponent<typeof BasicLink> = (props) => {
  return <CreatedLink {...props} />;
};

export default Link;

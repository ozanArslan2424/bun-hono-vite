import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import Link from "./link";

type Children = {
  children?: React.ReactNode;
};

type BreadcrumbProps = React.ComponentProps<"nav">;
type BreadcrumbListProps = React.ComponentProps<"ol">;
type BreadcrumbItemProps = React.ComponentProps<"li">;
type BreadcrumbLinkProps = React.ComponentProps<typeof Link>;
type BreadcrumbPageProps = React.ComponentProps<"span">;
type BreadcrumbSeparatorProps = React.ComponentProps<"li"> & Children;
type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

export function Breadcrumb({ ...props }: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  return <Link className={cn("transition-colors hover:text-foreground", className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

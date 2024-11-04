import { cn } from "@/lib/utils";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { useMemo } from "react";

type CalloutProps = {
  children?: React.ReactNode;
  variant?: "info" | "warning" | "error" | "success";
  className?: string;
};

export function Callout(props: CalloutProps) {
  const { children, variant = "info", className } = props;

  const styles = (variant: CalloutProps["variant"]) => {
    switch (variant) {
      case "info":
        return "border-sky-400";
      case "warning":
        return "border-amber-400";
      case "error":
        return "border-red-500";
      case "success":
        return "border-emerald-500";
    }
  };
  const icons = (variant: CalloutProps["variant"]) => {
    switch (variant) {
      case "info":
        return <InfoIcon className="size-6 text-sky-400" />;
      case "warning":
        return <CircleAlertIcon className="size-6 text-amber-400" />;
      case "error":
        return <TriangleAlertIcon className="size-6 text-red-400" />;
      case "success":
        return <CircleCheckIcon className="size-6 text-emerald-400" />;
    }
  };

  const calloutType = useMemo(() => {
    return { style: styles(variant), icon: icons(variant) };
  }, [variant]);

  if (!children || children === "") return null;

  return (
    <div className={cn("relative flex items-center gap-2 rounded-lg border-2", calloutType.style)}>
      <div className="bg-background absolute -left-3.5 -top-3.5 aspect-square h-8 min-h-8 w-8 min-w-8 rounded-full p-1.5"></div>
      <div className="absolute -left-4 -top-4 z-[1] p-1.5">{calloutType.icon}</div>
      <div className={cn("px-4 py-2 font-medium leading-tight", className)}>{children}</div>
    </div>
  );
}

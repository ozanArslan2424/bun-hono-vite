import { cn } from "@/lib/utils";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";

type CalloutProps = {
  children?: React.ReactNode;
  type: "info" | "warning" | "error" | "success";
};

export function Callout(props: CalloutProps) {
  const { children, type } = props;

  const styles = (type: CalloutProps["type"]) => {
    switch (type) {
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
  const icons = (type: CalloutProps["type"]) => {
    switch (type) {
      case "info":
        return <InfoIcon className="size-8 text-sky-400" />;
      case "warning":
        return <CircleAlertIcon className="size-8 text-amber-400" />;
      case "error":
        return <TriangleAlertIcon className="size-8 text-red-400" />;
      case "success":
        return <CircleCheckIcon className="size-8 text-emerald-400" />;
    }
  };

  if (!children || children === "") return null;

  return (
    <div className={cn("flex items-center gap-2 rounded-lg border-2 p-2 font-semibold", styles(type))}>
      <div className="grid aspect-square h-full place-content-center p-4">{icons(type)}</div>
      <div>{children}</div>
    </div>
  );
}

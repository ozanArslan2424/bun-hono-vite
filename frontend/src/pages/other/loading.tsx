import { LoaderIcon } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="grid h-full flex-1 place-content-center">
      <LoaderIcon size={64} className="animate-spin" />
    </div>
  );
}

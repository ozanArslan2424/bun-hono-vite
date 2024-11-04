import Link from "@/components/ui/link";
import { iconSizes } from "@/lib/config";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="grainy flex h-screen w-full items-center justify-center">
      <div className="bg-primary text-primary-foreground max-w-96 text-wrap break-words rounded-xl p-8">
        <p className="mb-2 block font-mono text-4xl font-bold">404</p>
        <p className="mb-4 font-mono">The page you are looking for is not here.</p>
        <Link to="/" asButton variant="secondary" className="w-full gap-2">
          <ArrowLeft size={iconSizes.md} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
}

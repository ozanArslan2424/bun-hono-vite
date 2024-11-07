import Link from "@/components/elements/link";
import { useUserQuery } from "@/lib/api/get";

export function LandingPage() {
  const { user } = useUserQuery();

  return (
    <div className="flex gap-8">
      <div className="w-5/12">
        <div className="aspect-video w-full rounded-xl border"></div>
      </div>
      <div className="w-7/12 space-y-4">
        <h1>This is the Landing Page</h1>
        <p className="text-muted-foreground w-full text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia, metus nec
          tincidunt lacinia, mi.
        </p>
        <p className="text-muted-foreground w-full text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam recusandae, optio
          quaerat eos minus illum et, facilis obcaecati delectus architecto beatae quis iure ad
          accusantium libero nesciunt dolore? Id, consequatur?
        </p>

        <Link to={user ? "/dashboard" : "/register"} asButton size="lg">
          {user ? "Go to Dashboard" : "Register now"}
        </Link>
      </div>
    </div>
  );
}

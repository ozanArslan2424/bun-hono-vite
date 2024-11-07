import { DashboardActionsList } from "@/components/app/dashboard-actions-list";
import { DashboardBookList } from "@/components/app/dashboard-book-list";
import { slide } from "@/components/motion/slide-from";
import { useUserQuery } from "@/lib/api/get";

import { motion } from "framer-motion";

export function DashboardPage() {
  const { user } = useUserQuery();

  if (!user) return;

  return (
    <div className="flex flex-1 gap-20 px-40 py-12">
      <motion.main className="w-full" {...slide("left")}>
        <h1 className="pb-2">Dashboard</h1>
        <p className="text-muted-foreground pb-4 text-lg font-medium">Welcome back, {user.name}!</p>
        <div className="grid grid-cols-2 gap-4">
          <DashboardBookList />
        </div>
      </motion.main>

      <motion.aside className="flex w-1/3 flex-col items-end" {...slide("right")}>
        <h1 className="pb-2 text-right">Actions</h1>
        <DashboardActionsList />
      </motion.aside>
    </div>
  );
}

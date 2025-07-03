import { userStats } from "@/lib/db";
import { DollarSign, PackageSearch, Save } from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StatCard from "@/components/StatsCard";

const StatsSection = async () => {
  const {userId} = await auth();
  if (!userId) return redirect("/sign-in");
  const states = await userStats(userId);
  return (
    <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6">
      <StatCard
        icon={<Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        label="Templates Created"
        value={states.totalTemplates}
        colorClass="bg-blue-100 dark:bg-blue-900/30"
      />
      <StatCard
        icon={
          <PackageSearch className="w-5 h-5 text-green-600 dark:text-green-400" />
        }
        label="Content Generated"
        value={states.totalContent}
        colorClass="bg-green-100 dark:bg-green-900/30"
      />
      <StatCard
        icon={
          <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        }
        label="Total Credits Spent"
        value={states.totalCredits}
        colorClass="bg-purple-100 dark:bg-purple-900/30"
      />
    </div>
  );
};
export default StatsSection;

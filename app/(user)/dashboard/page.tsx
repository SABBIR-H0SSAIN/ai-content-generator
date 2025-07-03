import { CreditBalanceWithSpinner } from "@/components/CreaditBalanceWithSpinner";
import { Metadata } from "next";

import StatsSection from "./_components/StatsSection";
import QuickActionsSection from "./_components/QucicActionsSection";
import { Suspense } from "react";
import StatsSectionSkeleton from "./_components/StatsSectionSkeleton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your AI templates and content generation",
};

const DashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 mt-5 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-md dark:shadow-none border">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ready to create amazing content with AI?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Current Balance:
            </span>
            <CreditBalanceWithSpinner />
          </div>
        </div>
      </div>
      <Suspense fallback={<StatsSectionSkeleton/>}>
        <StatsSection />
      </Suspense>
      <QuickActionsSection />
    </div>
  );
};

export default DashboardPage;

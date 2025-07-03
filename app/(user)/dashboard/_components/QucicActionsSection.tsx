"use client";

import QuickActionCard from "@/components/QuickActionCard";
import type { QuickActionProps } from "@/constants/dashboard-quick-actions";
import { quickActions } from "@/constants/dashboard-quick-actions";
import { Sparkles } from "lucide-react";


const QuickActionsSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Quick Actions Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {quickActions.map((action: QuickActionProps , index: number) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

    export default QuickActionsSection;

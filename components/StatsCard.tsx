import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
}

const StatCard = ({ icon, label, value, colorClass }: StatCardProps) => (
  <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm ">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default StatCard;

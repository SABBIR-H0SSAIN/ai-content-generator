import { Skeleton } from "@/components/ui/skeleton";

const StatsSectionSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6">
      {new Array(count).fill(null).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSectionSkeleton;

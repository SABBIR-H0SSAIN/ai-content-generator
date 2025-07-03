import { Skeleton } from "./ui/skeleton";

export const TemplatePreviewCardSkeleton = () => {
  return (
    <div className="h-full gap-2 cursor-pointer flex flex-col justify-between p-4 mt-5 max-w-[250px] bg-card shadow-lg rounded-md hover:scale-103 transition-all duration-200">
      <div className="flex justify-between">
        <Skeleton className="size-[80px] rounded-md" />
      </div>
      <Skeleton className="w-full h-6 " />
      <Skeleton className="w-full h-16"/>
    </div>
  );
};

const TemplatesLoadingSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
    <div className=" grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 px-5 lg:px-10 max-xs:px-3 max-xs:gap-3 gap-5 ">
      {Array.from({ length: count }).map((_, index) => (
        <TemplatePreviewCardSkeleton key={index} />
      ))}
    </div>
    </div>
  );
};

export default TemplatesLoadingSkeleton;

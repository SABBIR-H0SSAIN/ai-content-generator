import Searchbar from "@/components/Searchbar";
import TemplatesLoadingSkeleton from "@/components/TemplatesLoadingSkeleton";
import { Suspense } from "react";
import TemplatesExplorePageContent from "./_TemplatesExplorePageContent";

const TemplatesExplorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  return (
    <>
      <div className=" py-10 px-5 w-full  flex  flex-col items-center justify-center text-white gradient-1 ">
        <h1 className="text-2xl font-semibold text-center">
          Explore the prebuild templates
        </h1>
        <p className="text-sm pb-3 text-center">
          What type of content are you looking for?
        </p>

        <Suspense>
          <Searchbar />
        </Suspense>
      </div>
      <Suspense fallback={<TemplatesLoadingSkeleton count={12} />}>
        <TemplatesExplorePageContent params={searchParams} />
      </Suspense>
    </>
  );
};

export default TemplatesExplorePage;

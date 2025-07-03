import Searchbar from "@/components/Searchbar";
import TemplatesLoadingSkeleton from "@/components/TemplatesLoadingSkeleton";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import TemplatesPageContent from "./_components/TemplatesPageContent";

const MyTemplatesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const {userId} = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gradient-2 mb-10 gap-2 p-4">
        <h1 className="w-full  text-3xl font-semibold  text-white text-center ">
          My Templates
        </h1>
        <div className="py-2 flex flex-row  gap-2">
          <Searchbar />
          <Link href="/templates/create">
            <div className="flex px-4 py-[8px] rounded-lg items-center justify-center gap-2 text-white max-xs:hidden bg-dark-1/60 hover:bg-dark-1/70 cursor-pointer">
              <PlusIcon strokeWidth={4} className="w-4 h-4 " />
              New Template
            </div>
          </Link>
        </div>
      </div>
      <Suspense fallback={<TemplatesLoadingSkeleton count={12} />}>
        <TemplatesPageContent params={searchParams} userId={userId} />
      </Suspense>
    </div>
  );
};
export default MyTemplatesPage;


import { auth } from "@clerk/nextjs/server";
import CreaditManagement from "./_components/CreaditManagement";
import PaymentHistoryTableContent from "./_components/PaymentHistoryTableContent";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const SubscriptionPage = async ({
  searchParams,
}:{
  searchParams:Promise<{
    page?:string,
  }>
}) => {
  const {userId} = await auth();
  if(!userId){
   return redirect('/sign-in');
  }

  return (
    <div className="py-5 w-full  flex  flex-col gap-4 justify-center  ">
      <div className="px-5 max-w-7xl mx-auto">
        <CreaditManagement />
      </div>
      <div className="w-full  max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold py-3 px-4 ">Payment history</h1>
        <Suspense fallback={<Spinner />}>
          <PaymentHistoryTableContent
            params={searchParams}
            userId={userId}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SubscriptionPage;

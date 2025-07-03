import Pagination from "@/components/Pagination";
import PaymentHistoryTable from "@/components/PaymentHistoryTable";
import { PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT } from "@/constants";
import { getUserPaymentHistory } from "@/lib/db";

const PaymentHistoryTableContent = async ({
  params,
  userId,
}: {
  params: Promise<{
    page?: string;
  }>;
  userId: string;
}) => {
  const { page } = await params;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT;
  const history = await getUserPaymentHistory(userId, {
    limit: PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT,
    offset,
  });

  return (
    <div className="w-full  px-1 xs:px-5 ">
      <div className="w-full ">
        <PaymentHistoryTable data={history} />
      </div>
      <div className="w-full flex justify-center py-5">
        <Pagination
          currentPage={currentPage}
          count={history.length}
          limit={PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT}
        />
      </div>
    </div>
  );
};

export default PaymentHistoryTableContent;

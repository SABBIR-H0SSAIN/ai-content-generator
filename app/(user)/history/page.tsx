import ContentHistoryTableRow from "@/components/ContentHistoryTableRow";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONTENT_HISTORY_PAGINATION_LIMIT } from "@/constants";
import { getUserContentHistory } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  const { page } = await searchParams;
  const limit = CONTENT_HISTORY_PAGINATION_LIMIT;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * limit;

  const history = await getUserContentHistory(userId, {
    limit,
    offset,
  });

  return (
    <div className="w-full max-w-7xl mx-auto xs:px-5 ">
      <div className="w-full ">
        <Table className="text-md w-full table-fixed min-w-[600px] ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="w-[200px]  ">Template</TableHead>
              <TableHead className="sm:text-center  ">Ai Response</TableHead>
              <TableHead className="w-[60px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history &&
              history.map((item, index) => (
                <ContentHistoryTableRow key={index} data={item} />
              ))}
          </TableBody>
        </Table>
        <div className="w-full flex justify-center py-5">
          <Pagination
            currentPage={Number(page) || 1}
            count={history.length}
            limit={CONTENT_HISTORY_PAGINATION_LIMIT}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

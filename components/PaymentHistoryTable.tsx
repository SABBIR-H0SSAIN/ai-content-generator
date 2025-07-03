import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PaymentHistoryTableType {
  id: string;
  amount: number;
  creadit_amount: number;
  status: "successful" | "pending" | "failed" | "canceled";
  created_at: Date;
  txnId: string;
}

const PaymentHistoryTable = ({ data }: { data: PaymentHistoryTableType[] }) => {
  return (
    <Table className="bg-card rounded-md text-md w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="px-5">Invoice id</TableHead>
          <TableHead className="px-5">Amount (BDT)</TableHead>
          <TableHead className="px-5">Credit Amount</TableHead>
          <TableHead className="px-5 text-right">Status</TableHead>
          <TableHead className="px-5">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            className="hover:bg-gray-100 dark:hover:bg-dark-4/50"
            key={index}
          >
            <TableCell className="px-5 ">{item.id}</TableCell>
            <TableCell className="px-5">{item.amount}</TableCell>
            <TableCell className="px-5">{item.creadit_amount}</TableCell>
            <TableCell className="px-5 text-center">
              <span
                className={cn(
                  "text-md py-[3px] font-semibold px-4 rounded-md w-[100px] text-gray-100",
                  {
                    "bg-green-500": item.status === "successful",
                    "bg-red-500": item.status === "failed",
                    "text-foreground": item.status === "pending",
                    "bg-gray-500": item.status === "canceled",
                  }
                )}
              >
                {item.status}
              </span>
            </TableCell>
            <TableCell className="px-5">
              {item.created_at.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentHistoryTable;

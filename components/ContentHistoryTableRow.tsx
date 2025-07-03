"use client";
import { CopyButtonIcon } from "@/components/CopyButton";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserContentHistoryType } from "@/lib/db";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContentHistoryTableRow = ({ data }: { data: UserContentHistoryType }) => {
  const router = useRouter();

  return (
    <TableRow className="hover:bg-white dark:hover:bg-dark-3">
      <TableCell>{data.created_at.toLocaleDateString()}</TableCell>
      <TableCell
        onClick={() => router.push(`/templates/${data.template_id}`)}
        className=""
      >
        <div className="  cursor-pointer flex items-center flex-row gap-2 ">
          <Image
            src={data.template.icon}
            alt={data.template.title}
            width={20}
            height={20}
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {" "}
            {data.template.title}
          </span>
        </div>
      </TableCell>

      <TableCell className="w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
        {data.content}
      </TableCell>
      <TableCell className="text-right">
        <CopyButtonIcon content={data.content!} />
      </TableCell>
    </TableRow>
  );
};

export default ContentHistoryTableRow;

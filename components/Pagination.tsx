"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  count: number;
  limit: number;
  className?: string;
  hidden?: boolean;
}

const Pagination = ({
  currentPage,
  count,
  limit,
  className,
  hidden = false,
}: PaginationProps) => {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = count == limit;

  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const searchParams = new URLSearchParams(params);

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      if (currentPage === 2) {
        searchParams.delete("page");
      } else {
        searchParams.set("page", (currentPage - 1).toString());
      }

      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      searchParams.set("page", (currentPage + 1).toString());

      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <Button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        variant="outline"
        className="bg-white shadow-lg outline-8 cursor-pointer"
      >
        <ChevronLeft />
        Previous
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => {
          router.replace(pathname);
        }}
        className="bg-white shadow-lg cursor-pointer"
      >
        <Home />
      </Button>
      <Button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        hidden={hidden}
        variant="outline"
        className="bg-white shadow-lg cursor-pointer"
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;

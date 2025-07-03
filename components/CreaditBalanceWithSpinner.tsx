"use client";

import { useCreaditBalance } from "@/providers/CreaditBalanceProvider";
import Image from "next/image";
import { Spinner } from "./ui/spinner";

export const CreditBalanceWithSpinner = () => {
  const { balance, loading } = useCreaditBalance();
  return loading ? (
    <Spinner className="size-6 text-gray-700 dark:text-white  " show={true} />
  ) : (
    <div className="flex flex-row items-center">
      <Image src="/star.png" alt="star" width={32} height={32} />
      <span className="text-md font-semibold text-orange-400">{balance}</span>
    </div>
  );
};

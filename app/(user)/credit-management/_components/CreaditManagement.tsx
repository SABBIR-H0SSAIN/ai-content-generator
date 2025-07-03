"use client";

import AddCreaditBalanceDialog from "@/components/AddCreaditBalanceDialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreaditBalance } from "@/providers/CreaditBalanceProvider";
import Image from "next/image";
import { useState } from "react";
import CreaditPacks from "./CreaditPacks";

const CreaditManagement = () => {
  const { balance, loading } = useCreaditBalance();

  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  return (
    <div className="flex  flex-col gap-4 md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        {loading ? (
          <Spinner
            className=" size-20 text-gray-700 dark:text-white"
            show={true}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image alt="star" src="/star.png" width={100} height={100} />
            <span className="text-4xl font-semibold text-amber-400">
              {balance}
            </span>
          </div>
        )}
        <AddCreaditBalanceDialog
          amount={amount}
          setAmount={setAmount}
          open={openDialog}
          setOpen={setOpenDialog}
        />

        <Button
          onClick={() => setOpenDialog(true)}
          className="text-md font-semibold text-white"
        >
          Add creadit
        </Button>
        <p className="text-sm text-gray-500">
          Add creadit from here or choose a pack to purchase
        </p>
      </div>
      <div className="flex-1 w-full  max-w-[500px] sm:min-w-[400px] self-center">
        <h1 className="text-3xl font-semibold pb-4">Choose a pack</h1>
        <CreaditPacks setOpenDialog={setOpenDialog} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default CreaditManagement;

import { Button } from "@/components/ui/button";
import { creaditPacks } from "@/constants";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const CreaditPacks = ({
  setAmount,
  setOpenDialog,
}: {
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {creaditPacks.map((pack, index) => (
        <div
          key={index}
          className="bg-card shadow-md px-4 py-3 flex  rounded-md w-full gap-4 flex-row items-center justify-between"
        >
          <h1 className="text-lg font-semibold">{pack.price} BDT</h1>
          <div className="flex flex-row items-center justify-center ">
            {/* <div className="flex flex-row items-center justify-center gap-1"> */}
            <Image src="/star.png" alt="star" width={32} height={32} />
            <h1 className="text-lg font-semibold">{pack.quantity} </h1>
          </div>
          <Button
            onClick={() => {
              setAmount(pack.quantity);
              setOpenDialog(true);
            }}
            className="text-md font-semibold text-white"
          >
            <ShoppingCart /> Buy
          </Button>
        
        </div>
      ))}
    </div>
  );
};

export default CreaditPacks;

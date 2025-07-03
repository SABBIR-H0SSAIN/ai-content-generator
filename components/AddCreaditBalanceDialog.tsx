"use client";
import { createPaymentAction } from "@/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const AddCreaditBalanceDialog = ({
  open,
  setOpen,
  amount,
  setAmount,
}: {
  open: boolean;
  amount?: number | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [state, action, loading] = useActionState(createPaymentAction, {
    success: false,
    error: "",
  });

  const hasError = !loading && state.success == false && state.error;
  const hasSuccess = !loading && state.success == true && state.paymentUrl;

  const router = useRouter();
  useEffect(() => {
    if (hasSuccess) {
      router.push(state.paymentUrl);
    }
  }, [state, hasSuccess, router]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-md"
      >
        <form action={action}>
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold">
              Purchase creadits
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2">
                <p>Enter the amount of creadits you want to purchase.</p>
                <p className="inline-flex items-center gap-1">
                  <span>1</span>
                  <Image src="/star.png" alt="star" width={20} height={20} />
                  <span>= 2 BDT</span>
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <FormInput
                type="number"
                label="Creadit amount"
                placeholder="Enter amount"
                required
                accept="number"
                name="amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                defaultValue={(amount && amount.toString()) || ""}
              />

              {hasError && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              {hasSuccess && (
                <p className="text-sm text-gray-500">
                  <a
                    href={state.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Click here to pay
                  </a>
                </p>
              )}

              <p className="text-sm text-gray-500">
                You will be charged{" "}
                <span className="font-semibold text-foreground">
                  {(amount && amount * 2) || 0} BDT
                </span>
              </p>
            </div>
          </div>

          <DialogFooter className="sm:justify-start py-4">
            <Button
              disabled={loading}
              className="text-md font-semibold text-white w-full"
              type="submit"
            >
              {loading ? (
                <Spinner className="text-white size-4" />
              ) : (
                <DollarSign />
              )}
              Pay now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreaditBalanceDialog;

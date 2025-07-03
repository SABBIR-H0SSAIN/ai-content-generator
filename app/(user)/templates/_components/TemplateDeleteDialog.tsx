import { deleteTemplateAction } from "@/actions/deleteTemplateAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useActionState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export function TemplateDeleteDialog({
  open,
  setOpen,
  templateId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  templateId: string;
}) {
  const [state, action, loading] = useActionState(deleteTemplateAction, {
    success: false,
    error: null,
  });

  const handleStateChange = useCallback(() => {
    if (state.success === true) {
      setOpen(false);
      toast.success("Template deleted successfully", {
        className: "bg-green-500 text-white",
      });
    } else if (state.error && state.error !== null) {
      toast.error("Failed to delete template", {
        className: "bg-red-500 text-white",
      });
    }
  }, [state, setOpen]);

  useEffect(() => {
    handleStateChange();
  }, [handleStateChange]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action} className="flex flex-col gap-2">
          <input type="hidden" name="templateId" value={templateId} />
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold">
              Delete Template
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-[16px]">
            Are you sure you want to delete this template?
          </DialogDescription>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="text-gray-200 text-md"
            >
              {loading && <Spinner className="w-4 h-4 text-white" />}
              {loading ? "Deleting" : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TemplateDeleteDialog;

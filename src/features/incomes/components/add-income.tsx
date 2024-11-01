import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import IncomeForm from "../forms/income-form";

type IncomeProps = {
  open: boolean;
  editData: any;
  onClose: () => void;
  refetch: () => void;
};

function IncomeDialog({ open, editData, onClose, refetch }: IncomeProps) {
  function onPaymentCreateHandler(status: boolean, action: "add" | "update") {
    const toastText = action == "add" ? "added" : "updated";
    if (status) {
      refetch();
      onClose();
      toast.success(`Income ${toastText} successfully.`);
    } else {
      toast.error(`Failed to ${toastText} income.`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {editData != null ? "Edit Income" : "Add New Income"}
          </DialogTitle>
        </DialogHeader>
        <IncomeForm
          editData={editData}
          onCreate={(status, action) => onPaymentCreateHandler(status, action)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default IncomeDialog;

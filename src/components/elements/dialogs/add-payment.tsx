import { useCategory, usePaymentMethod } from "@/hooks/api-calls";
import {
  Category,
  InputSelectOption,
  Payment,
  PaymentMethod,
} from "@/types/types";
import { toast } from "sonner";

import PaymentForm from "@/components/forms/payment-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PropTypes = {
  open: boolean;
  editData: Payment | null;
  onClose: () => void;
  refetch: () => void;
};

function PaymentDialog({ open, editData, onClose, refetch }: PropTypes) {
  //FETCH CATEGORIES
  const { data: categories } = useCategory({
    select(data: Category[]) {
      const options: InputSelectOption[] = [];
      data.map((category) =>
        options.push({ name: category.name, value: category.id.toString() }),
      );
      return options;
    },
    refetchOnWindowFocus: false,
  });

  //FETCH PAYMENT METHODS
  const { data: paymentMethods } = usePaymentMethod({
    select(data: PaymentMethod[]) {
      const options: InputSelectOption[] = [];
      data.map((paymentMethod) =>
        options.push({
          name: paymentMethod.name,
          value: paymentMethod.id.toString(),
        }),
      );
      return options;
    },
    refetchOnWindowFocus: false,
  });

  /**
   * Check is payment created successfully
   * @param status boolean
   */
  function onPaymentCreateHandler(status: boolean, action: "add" | "update") {
    const toastText = action == "add" ? "added" : "updated";
    if (status) {
      refetch();
      onClose();
      toast.success(`Payment ${toastText} successfully`);
    } else {
      toast.error(`Failed to ${toastText} payment`);
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
            {editData != null ? "Edit Payment" : "Add New Payment"}
          </DialogTitle>
        </DialogHeader>
        <PaymentForm
          categories={categories as unknown as InputSelectOption[]}
          paymentMethods={paymentMethods as unknown as InputSelectOption[]}
          editData={editData}
          onCreate={(status, action) => onPaymentCreateHandler(status, action)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDialog;

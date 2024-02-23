import { Category, PaymentMethod, InputSelectOption } from "@/types/types";
//IMPORT COMPONENTS
import PaymentForm from "@/components/forms/PaymentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
//IMPORT HOOKS
import { useCategory, usePaymentMethod } from "@/hooks/api-calls/ApiCalls";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};

function PaymentDialog({ open, onClose }: PropTypes) {
  const { data: categories } = useCategory({
    select(data: Category[]) {
      const options: InputSelectOption[] = [];
      data.map((category) =>
        options.push({ name: category.name, value: category.id.toString() }),
      );
      return options;
    },
  });

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
  });

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
        </DialogHeader>
        <PaymentForm
          categories={categories as unknown as InputSelectOption[]}
          paymentMethods={paymentMethods as unknown as InputSelectOption[]}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDialog;

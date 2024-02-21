import PaymentForm from "@/components/forms/PaymentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};

function PaymentDialog({ open, onClose }: PropTypes) {
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
        <PaymentForm />
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDialog;

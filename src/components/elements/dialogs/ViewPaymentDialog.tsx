import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Payment, SinglePaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import LoadingTextSeletion from "@/components/ui/skeletons/LoadingTextSkeletion";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

type ViewPaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  payment: Payment;
};

function ViewPaymentDialog({ open, onClose, payment }: ViewPaymentDialogProps) {
  const { data, isFetching, error } = useQuery<SinglePaymentResponse>({
    queryKey: ["payment", payment.id],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.payments}/${payment.id}`,
      });
    },
  });

  if (error) {
    toast.error("Failed to fetch payment details");
  }

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Payment Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div>
          <div className="mb-4 flex items-center justify-end gap-2 text-sm font-medium">
            <Label>Date:</Label>
            <p>{payment.date}</p>
          </div>
          <div className="flex flex-col justify-between text-sm font-medium">
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Payment For</Label>
              <span>:</span>
              <p>{payment.name}</p>
            </div>
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Amount</Label>
              <span>:</span>
              <p>
                {payment.amount} {payment.currency.toUpperCase()}
              </p>
            </div>
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Category</Label>
              <span>:</span>
              {isFetching ? <LoadingTextSeletion /> : <p>{data?.category}</p>}
            </div>
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Payment Method</Label>
              <span>:</span>
              {isFetching ? (
                <LoadingTextSeletion />
              ) : (
                <p>{data?.payment_method}</p>
              )}
            </div>
          </div>
          <div className="mb-[2px] flex items-center gap-2">
            <Label className="w-32">Note</Label>
            <span>:</span>
            <p className="text-sm font-medium">
              {isFetching ? (
                <LoadingTextSeletion />
              ) : (
                data?.payment_note || "No note available"
              )}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPaymentDialog;

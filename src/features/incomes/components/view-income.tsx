import { Income, IncomeNote } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import LoadingTextSeletion from "@/components/ui-elements/loading-text-skeletion";
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

//IMPORT UTILS
import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";

type ViewIncomeDialogProps = {
  open: boolean;
  income: Income;
  onClose: () => void;
};
function ViewIncomeDialog({ open, income, onClose }: ViewIncomeDialogProps) {
  const { data, isFetching, error } = useQuery<IncomeNote>({
    queryKey: ["income", income?.id],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.incomes}/${income.id}`,
      });
    },
    refetchOnWindowFocus: false,
  });

  if (error) {
    toast.error("Failed to fetch income details");
  }

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Income Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div>
          <div className="mb-4 flex items-center justify-end gap-2 text-sm font-medium">
            <Label>Date:</Label>
            <p>{income?.date}</p>
          </div>
          <div className="flex flex-col justify-between text-sm font-medium">
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Income Source</Label>
              <span>:</span>
              <p>{income?.source}</p>
            </div>
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Amount</Label>
              <span>:</span>
              <p>
                {income?.amount} {income?.currency.toUpperCase()}
              </p>
            </div>
            <div className="mb-[2px] flex items-center gap-2">
              <Label className="w-32">Note</Label>
              <span>:</span>
              {isFetching ? (
                <LoadingTextSeletion />
              ) : (
                <p>{data?.note || "No note available"}</p>
              )}
            </div>
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

export default ViewIncomeDialog;

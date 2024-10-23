import { Dialog, DialogContent } from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";

function LoadingDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent className="h-36 max-w-sm">
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner size="lg" />
          <span>Please wait. Do not close this window.</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;

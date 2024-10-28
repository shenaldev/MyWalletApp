import { Dialog, DialogContent } from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

type LoadingDialogProps = {
  open: boolean;
  className?: string;
  text?: string;
};
function LoadingDialog({ open, className, text }: LoadingDialogProps) {
  const classes = cn("h-36 max-w-sm", className);

  return (
    <Dialog open={open}>
      <DialogContent className={classes}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner size="lg" />
          <p className="mt-4 text-center">
            {text ? text : "Please wait. Do not close this window."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;

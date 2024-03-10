import { ReactNode } from "react";
import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onDelete: () => void;
  children?: ReactNode;
};

function DeleteAlertDialog({
  open,
  onClose,
  onCancel,
  onDelete,
  children,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure You Want to Delete?</AlertDialogTitle>
          <AlertDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
            {children}
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="border-gray-400">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertDialog;

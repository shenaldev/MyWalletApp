import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
  onClick?: () => void;
};

function BackButton({ className, onClick }: BackButtonProps) {
  const classes = cn(
    "flex w-28 items-center gap-2 rounded border bg-primary-foreground px-4 py-1 hover:bg-primary hover:text-white",
    className,
  );

  return (
    <div className="container mt-2 flex justify-end">
      <Link to="/" className={classes} onClick={onClick}>
        <ArrowLeftIcon className="size-4" /> Back
      </Link>
    </div>
  );
}

export default BackButton;

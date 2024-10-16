import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

type FinanceCardProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onAction?: () => void;
};

function FinanceCard({
  title,
  children,
  className,
  onAction,
}: FinanceCardProps) {
  const classes = cn(
    className,
    "w-full shadow-sm lg:w-1/2 bg-slate-50 dark:bg-[#0a1120]",
  );

  return (
    <Card className={classes}>
      <CardHeader className="flex-row items-center justify-between lg:pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <Button
          variant="ghost"
          size="iconsm"
          className="rounded-full bg-ternary hover:bg-ternary/80"
          onClick={onAction}
        >
          <Plus color="white" />
        </Button>
      </CardHeader>
      {children}
    </Card>
  );
}

export { FinanceCard, CardContent, CardFooter };

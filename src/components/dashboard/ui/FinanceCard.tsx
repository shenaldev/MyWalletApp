import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FinanceCardProps = {
  title: string;
  children?: React.ReactNode;
  onAction?: () => void;
};

function FinanceCard({ title, children, onAction }: FinanceCardProps) {
  return (
    <Card className="w-full shadow-sm lg:w-1/2">
      <CardHeader className="flex-row items-center justify-between">
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
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default FinanceCard;

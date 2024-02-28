import { Separator } from "@/components/ui/separator";
import { numberFormat } from "@/lib/Numbers";

function TotalCard({ total }: { total: number | string }) {
  return (
    <div className="flex flex-col items-end pt-8">
      <p className="text-lg font-semibold">Total: {numberFormat(total)}</p>
      <Separator className="mb-1 w-40 bg-blue-500" />
      <Separator className="w-40 bg-blue-500" />
    </div>
  );
}

export default TotalCard;

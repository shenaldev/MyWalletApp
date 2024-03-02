import { Separator } from "@/components/ui/separator";
import { numberFormat } from "@/lib/Numbers";
import { Income } from "@/types/types";
import dayjs from "dayjs";

function IncomeItem({ income }: { income: Income }) {
  const date = dayjs(income?.date).format("MM-DD");

  return (
    <>
      <li className="flex justify-between gap-4 px-3 py-3 text-sm font-medium duration-500 animate-in hover:bg-blue-100">
        <span>{date}</span>
        <span className="grow text-start">{income?.source}</span>
        <span>{numberFormat(income?.amount || 0)}</span>
      </li>
      <Separator />
    </>
  );
}

export default IncomeItem;

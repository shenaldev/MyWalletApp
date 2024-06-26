import dayjs from "dayjs";
import { ReactNode } from "react";
import { Income } from "@/types/types";
//IMPORT COMPONENTS
import { Separator } from "@/components/ui/separator";
//IMPORT UTILS
import { numberFormat } from "@/lib/Numbers";

type IncomeItemProps = {
  income: Income;
  children?: ReactNode;
};
function IncomeItem({ income, children }: IncomeItemProps) {
  const date = dayjs(income?.date).format("MM-DD");

  return (
    <>
      <li className="hover:bg-itemHover flex justify-between gap-4 px-3 py-3 text-sm font-medium duration-500 animate-in">
        <span>{date}</span>
        <span className="grow text-start capitalize">{income?.source}</span>
        <span>{numberFormat(income?.amount || 0)}</span>
        {children}
      </li>
      <Separator />
    </>
  );
}

export default IncomeItem;

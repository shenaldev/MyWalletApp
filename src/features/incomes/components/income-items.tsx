import { useMemo } from "react";

import { Income } from "@/types/types";

import ActionDropdown from "@/components/dashboard/action-dropdown";
import { ScrollArea, ScrollViewPort } from "@/components/ui/scroll-area";

import IncomeItem from "./income-item";
import IncomeSkeletion from "./income-skeletion";

type IncomeItemsProps = {
  data: Income[] | undefined;
  isLoading: boolean;
  actionHandler: (action: string, income: Income) => void;
};

function IncomeItems({ data, isLoading, actionHandler }: IncomeItemsProps) {
  const isEmpty = useMemo(() => data && data?.length <= 0, [data]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <IncomeSkeletion items={5} />
      </div>
    );
  }

  return (
    <ul className={isEmpty ? "" : "border"}>
      <ScrollArea>
        <ScrollViewPort className="max-h-96">
          {isEmpty && (
            <li className="py-3 text-center text-sm font-medium">
              No incomes for this month
            </li>
          )}
          {data?.map((income, index) => (
            <IncomeItem income={income} key={index}>
              <ActionDropdown
                onClick={(action) => actionHandler(action, income)}
              />
            </IncomeItem>
          ))}
        </ScrollViewPort>
      </ScrollArea>
    </ul>
  );
}

export default IncomeItems;

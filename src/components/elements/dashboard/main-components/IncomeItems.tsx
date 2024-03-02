import { Income } from "@/types/types";
//IMPORT COMPONENTS
import IncomeItem from "./IncomeItem";
import IncomeSkeletion from "@/components/ui/skeletons/IncomeSkeletion";
import { ScrollArea, ScrollViewPort } from "@/components/ui/scroll-area";

type IncomeItemsProps = {
  data: Income[] | undefined;
  isLoading: boolean;
};

function IncomeItems({ data, isLoading }: IncomeItemsProps) {
  if (isLoading) {
    return <IncomeSkeletion items={1} />;
  }

  return (
    <ul className="border">
      <ScrollArea>
        <ScrollViewPort className="max-h-96">
          {data?.map((income, index) => (
            <IncomeItem income={income} key={index} />
          ))}
        </ScrollViewPort>
      </ScrollArea>
    </ul>
  );
}

export default IncomeItems;

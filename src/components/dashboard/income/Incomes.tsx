import { useQuery } from "@tanstack/react-query";
import { IncomeResponse } from "@/types/types";
//IMPORT COMPONENTS
import TotalCard from "../ui/TotalCard";
import IncomeItems from "./IncomeItems";
import FinanceCard from "../ui/FinanceCard";
import ActionDropdown from "../ui/ActionDropdown";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

function Incomes() {
  const { selectedMonth, selectedYear } = useMonthYear();

  //FETCH INCOMES
  const { data: incomes, isLoading: isLoadingIncomes } =
    useQuery<IncomeResponse>({
      queryKey: ["incomes", selectedYear, selectedMonth],
      queryFn: async () => {
        return await axiosCall({
          method: "GET",
          urlPath: `${ApiUrls.user.incomes}/${selectedYear}/${selectedMonth + 1}`,
        });
      },
      enabled: true,
    });

  function actionHandler(action: string) {
    console.log(action);
  }

  return (
    <FinanceCard title="Incomes">
      <IncomeItems data={incomes?.incomes} isLoading={isLoadingIncomes}>
        <ActionDropdown onClick={(action) => actionHandler(action)} />
      </IncomeItems>
      <TotalCard total={incomes?.total || 0} />
    </FinanceCard>
  );
}

export default Incomes;

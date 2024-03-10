import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { Income, IncomeResponse } from "@/types/types";
//IMPORT COMPONENTS
import TotalCard from "../ui/TotalCard";
import IncomeItems from "./IncomeItems";
import FinanceCard from "../ui/FinanceCard";
import IncomeDialog from "@/components/elements/dialogs/IncomeDialog";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

function Incomes() {
  const { selectedMonth, selectedYear } = useMonthYear();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  //FETCH INCOMES
  const { data, isLoading, refetch } = useQuery<IncomeResponse>({
    queryKey: ["incomes", selectedYear, selectedMonth],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.incomes}/${selectedYear}/${selectedMonth + 1}`,
      });
    },
    enabled: true,
  });

  function actionHandler(action: string, income: Income) {
    if (action == "view") return;
    setSelectedIncome(income);
    if (action == "edit") {
      setOpenAdd(true);
    } else if (action == "delete") {
      setOpenDelete(true);
    }
  }

  return (
    <>
      <FinanceCard title="Incomes" onAction={() => setOpenAdd(true)}>
        <IncomeItems
          data={data?.incomes}
          isLoading={isLoading}
          actionHandler={actionHandler}
        />
        <TotalCard total={data?.total || 0} />
      </FinanceCard>
      <IncomeDialog
        open={openAdd}
        editData={selectedIncome}
        onClose={() => setOpenAdd(false)}
        refetch={refetch}
      />
    </>
  );
}

export default Incomes;

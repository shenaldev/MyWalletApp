import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { Income, IncomeResponse } from "@/types/types";
//IMPORT COMPONENTS
import TotalCard from "../ui/TotalCard";
import IncomeItems from "./IncomeItems";
import { CardContent, CardFooter, FinanceCard } from "../ui/FinanceCard";
import IncomeDialog from "@/components/elements/dialogs/IncomeDialog";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useMonthYear } from "@/components/providers/MonthYearProvider";
import ViewIncomeDialog from "@/components/elements/dialogs/ViewIncomeDialog";
import DeleteAlertDialog from "@/components/elements/dialogs/DeleteAlertDialog";

function Incomes() {
  const { selectedMonth, selectedYear } = useMonthYear();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
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

  //DELETE INCOME
  const deleteIncome = useMutation({
    mutationFn: async () => {
      return await axiosCall({
        method: "POST",
        urlPath: `${ApiUrls.user.incomes}/${selectedIncome?.id}`,
        data: { _method: "DELETE" },
      });
    },
    onSuccess: () => {
      refetch();
      toast.success("Payment Deleted Successfully");
    },
    onError: () => {
      toast.error("Failed to delete payment");
    },
    onSettled: () => {
      toast.dismiss();
      setSelectedIncome(null);
    },
  });

  function actionHandler(action: string, income: Income) {
    setSelectedIncome(income);
    if (action == "view") {
      setOpenView(true);
    } else if (action == "edit") {
      setOpenAdd(true);
    } else if (action == "delete") {
      setOpenDelete(true);
    }
  }

  function deleteDialogCancelHandler() {
    setOpenDelete(false);
    setSelectedIncome(null);
  }

  function deleteIcomeHandler() {
    deleteIncome.mutateAsync();
    toast.success("Deleting Income...");
  }

  function addIncomeButtonHandler() {
    setSelectedIncome(null);
    setOpenAdd(true);
  }

  return (
    <>
      <FinanceCard title="Incomes" onAction={addIncomeButtonHandler}>
        <CardContent className="lg:min-h-[26.4rem]">
          <IncomeItems
            data={data?.incomes}
            isLoading={isLoading}
            actionHandler={actionHandler}
          />
        </CardContent>
        <CardFooter>
          <TotalCard total={data?.total || 0} />
        </CardFooter>
      </FinanceCard>
      <IncomeDialog
        open={openAdd}
        editData={selectedIncome}
        onClose={() => setOpenAdd(false)}
        refetch={refetch}
      />
      {/* DELETE INCOME DIALOG */}
      {openDelete && (
        <DeleteAlertDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onCancel={deleteDialogCancelHandler}
          onDelete={deleteIcomeHandler}
        >
          <p className="mt-1 rounded-md bg-slate-100 py-2 text-center font-medium text-red-600">
            Income Name: {selectedIncome?.source}
          </p>
        </DeleteAlertDialog>
      )}
      {/* VIEW INCOME DIALOG */}
      {openView && selectedIncome && (
        <ViewIncomeDialog
          open={openView}
          income={selectedIncome}
          onClose={() => setOpenView(false)}
        />
      )}
    </>
  );
}

export default Incomes;

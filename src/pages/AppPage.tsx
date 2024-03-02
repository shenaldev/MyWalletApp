import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { IncomeResponse, PaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import TotalCard from "@/components/dashboard/ui/TotalCard";
import IncomeItems from "@/components/dashboard/income/IncomeItems";
import FinanceCard from "@/components/dashboard/ui/FinanceCard";
import PaymentItems from "@/components/dashboard/payment/PaymentItems";
//IMPORT PROVIDERS
import { useMonthYear } from "@/components/providers/MonthYearProvider";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

function AppPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const { selectedMonth, selectedYear } = useMonthYear();

  //FETCH PAYMENTS
  const {
    data,
    isLoading,
    refetch: paymentRefetch,
  } = useQuery<PaymentResponse>({
    queryKey: ["payments", selectedYear, selectedMonth],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.payments}/${selectedYear}/${selectedMonth + 1}`,
      });
    },
    enabled: true,
  });

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

  return (
    <DashboardLayout>
      <div className="flex justify-between gap-4">
        {/* PAYMENTS CARD */}
        <FinanceCard title="Payments" onAction={() => setOpenAdd(true)}>
          <PaymentItems data={data?.payments} isLoading={isLoading} />
          <TotalCard total={data?.total || 0} />
        </FinanceCard>

        {/* INCOMES CARD */}
        <FinanceCard title="Incomes">
          <IncomeItems data={incomes?.incomes} isLoading={isLoadingIncomes} />
          <TotalCard total={incomes?.total || 0} />
        </FinanceCard>
      </div>

      {/* ADD PAYMENT INCOME MODALS */}
      <PaymentDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        refetch={paymentRefetch}
      />
    </DashboardLayout>
  );
}

export default AppPage;

import { useState } from "react";
//IMPORT TYPES
import { PaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import { useMonthYear } from "@/components/providers/MonthYearProvider";
import FinanceCard from "@/components/elements/dashboard/main-components/FinanceCard";
import PaymentItems from "@/components/elements/dashboard/main-components/PaymentItems";
import { useQuery } from "@tanstack/react-query";
import { axiosCall } from "@/lib/axiosCall";
import ApiUrls from "@/lib/ApiUrls";

function AppPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const { selectedMonth, selectedYear } = useMonthYear();

  const { data, isLoading } = useQuery<PaymentResponse>({
    queryKey: ["payments", selectedYear, selectedMonth],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.payments}/${selectedYear}/${selectedMonth + 1}`,
      });
    },
    enabled: true,
  });

  return (
    <DashboardLayout>
      <div className="flex justify-between gap-4">
        <FinanceCard title="Payments" onAction={() => setOpenAdd(true)}>
          <PaymentItems data={data} isLoading={isLoading} />
        </FinanceCard>
        <FinanceCard title="Incomes" />
      </div>
      {/* ADD PAYMENT INCOME MODALS */}
      <PaymentDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </DashboardLayout>
  );
}

export default AppPage;

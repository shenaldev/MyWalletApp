import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { PaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import FinanceCard from "@/components/elements/dashboard/main-components/FinanceCard";
import PaymentItems from "@/components/elements/dashboard/main-components/PaymentItems";
//IMPORT PROVIDERS
import { useMonthYear } from "@/components/providers/MonthYearProvider";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

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

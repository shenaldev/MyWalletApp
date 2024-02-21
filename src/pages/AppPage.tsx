import { useState } from "react";
//IMPORT TYPES
import { PaymentsObject } from "@/types/Payment";
//IMPORT COMPONENTS
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import MonthYearProvider from "@/components/providers/MonthYearProvider";
import FinanceCard from "@/components/elements/dashboard/main-components/FinanceCard";
import PaymentItems from "@/components/elements/dashboard/main-components/PaymentItems";

const data: PaymentsObject[] = [
  {
    food: [
      { name: "Rice", price: 20, date: "2023-10-10" },
      { name: "Beans", price: 30, date: "2023-10-10" },
      { name: "Eggs", price: 10, date: "2023-10-20" },
    ],
    rent: [
      { name: "House", price: 200, date: "2023-10-25" },
      { name: "Shop", price: 300, date: "2023-10-27" },
    ],
    transport: [
      { name: "Bus", price: 5, date: "2023-10-06" },
      { name: "Bike", price: 2, date: "2023-10-07" },
    ],
    bills: [
      { name: "Electricity", price: 50, date: "2023-10-15" },
      { name: "Water", price: 20, date: "2023-10-17" },
    ],
  },
];

function AppPage() {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <MonthYearProvider>
      <DashboardLayout>
        <div className="flex justify-between gap-4">
          <FinanceCard title="Payments" onAction={() => setOpenAdd(true)}>
            <PaymentItems data={data} />
          </FinanceCard>
          <FinanceCard title="Incomes" />
        </div>
        {/* ADD PAYMENT INCOME MODALS */}
        <PaymentDialog open={openAdd} onClose={() => setOpenAdd(false)} />
      </DashboardLayout>
    </MonthYearProvider>
  );
}

export default AppPage;

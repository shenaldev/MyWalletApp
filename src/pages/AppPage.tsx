//IMPORT COMPONENTS
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Payments from "@/components/dashboard/payment/Payments";
import Incomes from "@/components/dashboard/income/Incomes";

function AppPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between gap-4">
        <Payments />
        <Incomes />
      </div>
    </DashboardLayout>
  );
}

export default AppPage;

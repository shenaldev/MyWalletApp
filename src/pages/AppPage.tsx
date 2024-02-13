import DashboardLayout from "@/components/layouts/DashboardLayout";
import MonthYearProvider from "@/components/providers/MonthYearProvider";

function AppPage() {
  return (
    <MonthYearProvider>
      <DashboardLayout></DashboardLayout>
    </MonthYearProvider>
  );
}

export default AppPage;

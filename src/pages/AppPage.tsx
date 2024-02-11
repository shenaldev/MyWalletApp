import DashboardLayout from "@/components/layouts/DashboardLayout";
import MonthYearProvider from "@/components/providers/MonthYearProvider";

function AppPage() {
  return (
    <MonthYearProvider>
      <DashboardLayout>
        <h1>App Page</h1>
        <div>
          <p>Content goes here...</p>
        </div>
      </DashboardLayout>
    </MonthYearProvider>
  );
}

export default AppPage;

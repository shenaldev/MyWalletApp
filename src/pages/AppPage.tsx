import DashboardLayout from "@/components/layouts/DashboardLayout";
import MonthYearProvider from "@/components/providers/MonthYearProvider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

function AppPage() {
  return (
    <MonthYearProvider>
      <DashboardLayout>
        <div className="flex justify-between gap-4">
          <Card className="w-1/2 shadow-sm">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-xl">Payments</CardTitle>
              <Button
                variant="ghost"
                size="iconsm"
                className="rounded-full bg-ternary hover:bg-ternary/80"
              >
                <Plus color="white" />
              </Button>
            </CardHeader>
          </Card>
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle className="text-xl">Incomes</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    </MonthYearProvider>
  );
}

export default AppPage;

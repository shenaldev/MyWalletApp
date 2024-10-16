import { useMediaQuery } from "@/hooks/use-media-query";

import Incomes from "@/components/dashboard/income/incomes";
import Payments from "@/components/dashboard/payment/payments";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AppPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DashboardLayout>
      <div className="w-full justify-between gap-4 lg:flex">
        {!isDesktop && (
          <Tabs defaultValue="payments">
            <TabsList className="grid w-full grid-cols-2 dark:bg-slate-900 dark:text-slate-200">
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="incomes">Incomes</TabsTrigger>
            </TabsList>
            <TabsContent value="payments" className="w-full">
              <Payments />
            </TabsContent>
            <TabsContent value="incomes">
              <Incomes />
            </TabsContent>
          </Tabs>
        )}
        {isDesktop && (
          <>
            <Payments />
            <Incomes />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AppPage;

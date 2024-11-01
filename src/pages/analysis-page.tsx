import { useMemo } from "react";

import { PaymentTotalByCategory, ReportResponse } from "@/types/ReportResponse";
import { useQuery } from "@tanstack/react-query";

import BackButton from "@/components/dashboard/back-button";
import TopBar from "@/components/dashboard/topbar/top-bar";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import IncomeExpenseChart from "@/features/analytics/income-expense-chat";
import PaymentTotalCarousel from "@/features/analytics/payment-totals-carousel";
import CategoryIcon from "@/features/payments/components/category-icon";

import { useMonthYear } from "@/providers/month-year-provider";

import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";
import { numberFormat } from "@/lib/numbers";

function AnalysisPage() {
  const selectedYear = useMonthYear().selectedYear;

  const { data } = useQuery<ReportResponse>({
    queryKey: ["report", { year: selectedYear }],
    queryFn: async () => {
      return axiosCall({
        method: "GET",
        urlPath: ApiUrls.user.report + `/${selectedYear}`,
      });
    },
    refetchOnWindowFocus: false,
  });

  const balance = useMemo(() => {
    return (
      parseFloat(data?.total_income || "0") -
      parseFloat(data?.total_payment || "0")
    );
  }, [data]);

  return (
    <div className="min-h-[100dvh] 2xl:container">
      <TopBar title="Income and Expense Analysis" />
      <BackButton className="mb-6 lg:mb-2" />
      {/* PAYMENTS SLIDER */}
      <PaymentTotalCarousel>
        {data?.payment_by_category?.map((expense) => (
          <CarouselItem
            key={expense.name}
            className="basis-11/12 md:basis-1/3 lg:basis-1/5"
          >
            <PaymentCard expense={expense} />
          </CarouselItem>
        ))}
      </PaymentTotalCarousel>
      {/* TOTAL INCOME AND EXPENSE AND BALANCE */}
      <div className="my-4 flex justify-center gap-4">
        <BalanceCard title="Total Incomes" amount={data?.total_income} />
        <BalanceCard title="Total Expenses" amount={data?.total_payment} />
        <BalanceCard title="Balance" amount={balance} />
      </div>
      {/* CHARTS */}
      <div className="container mt-8 flex w-full gap-4 pb-12">
        {data && (
          <>
            <IncomeExpenseChart
              payments={data.payment_by_month}
              incomes={data.income_by_month}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;

/**
 * PaymentCard Component
 */
type PaymentCardProps = {
  expense: PaymentTotalByCategory;
};

const PaymentCard = ({ expense }: PaymentCardProps) => {
  return (
    <Card className="shadow">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-4">
          <CategoryIcon
            icon={expense?.icon || "general"}
            className="size-5 dark:stroke-slate-300"
          />
          <h3 className="font-semibold text-slate-600 dark:text-slate-300">
            {expense.name}
          </h3>
        </div>
        <p className="text-lg font-semibold ">
          {numberFormat(expense.total)} LKR
        </p>
      </CardContent>
    </Card>
  );
};

type BalanceCardProps = {
  title: string;
  amount: number | string | undefined;
};

const BalanceCard = ({ title, amount }: BalanceCardProps) => {
  return (
    <Card className="min-w-96">
      <CardContent>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-semibold">
          {numberFormat(amount || 0)} LKR
        </p>
      </CardContent>
    </Card>
  );
};

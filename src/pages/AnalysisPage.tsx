import CategoryIcon from "@/components/dashboard/payment/CategoryIcon";
import TopBar from "@/components/dashboard/topbar/TopBar";
import BackButton from "@/components/dashboard/ui/BackButton";
import { useMonthYear } from "@/components/providers/MonthYearProvider";
import { Card, CardContent } from "@/components/ui/card";
import ApiUrls from "@/lib/ApiUrls";
import { numberFormat } from "@/lib/Numbers";
import { axiosCall } from "@/lib/axiosCall";
import { PaymentTotalByCategory, ReportResponse } from "@/types/ReportResponse";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] 2xl:container">
      <TopBar title="Income and Expense Analysis" />
      <BackButton className="mb-2" />
      <div className="container grid grid-cols-4 items-center gap-4">
        {data?.payment_by_category?.map((expense) => (
          <PaymentCard key={expense.name} expense={expense} />
        ))}
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
    <Card className="border-none shadow">
      <CardContent>
        <div className="mb-3 flex items-center gap-4">
          <CategoryIcon icon={expense?.icon || "general"} className="size-5" />
          <h3 className="font-semibold text-secondary">{expense.name}</h3>
        </div>
        <p className="text-lg font-semibold ">
          {numberFormat(expense.total)} LKR
        </p>
      </CardContent>
    </Card>
  );
};

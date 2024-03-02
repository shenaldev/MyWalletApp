import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { PaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import PaymentItem from "./PaymentItem";
import FinanceCard from "../ui/FinanceCard";
import CategoryCard from "./CategoryCard";
import ActionDropdown from "../ui/ActionDropdown";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import CategoryCardSkeleton from "@/components/ui/skeletons/CategoryCardSkeletion";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

function Payments() {
  const [openAdd, setOpenAdd] = useState(false);
  const { selectedMonth, selectedYear } = useMonthYear();

  //FETCH PAYMENTS
  const { data, isLoading, refetch } = useQuery<PaymentResponse>({
    queryKey: ["payments", selectedYear, selectedMonth],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.payments}/${selectedYear}/${selectedMonth + 1}`,
      });
    },
    enabled: true,
  });

  function actionHandler(action: string) {
    console.log(action);
  }

  const Skeletion = (
    <div className="space-y-3">
      <CategoryCardSkeleton items={5} />
    </div>
  );

  return (
    <>
      <FinanceCard title="Payments" onAction={() => setOpenAdd(true)}>
        {isLoading && Skeletion}
        <div className="space-y-4">
          {data?.payments.map((item, index) => (
            <CategoryCard
              key={index}
              details={{
                name: item.name,
                icon: item.icon,
                total: item.total,
              }}
            >
              <ul className="flex flex-col font-medium">
                {item.payments?.map((payment, index) => (
                  <PaymentItem key={index} payment={payment}>
                    <ActionDropdown
                      onClick={(action) => actionHandler(action)}
                    />
                  </PaymentItem>
                ))}
              </ul>
            </CategoryCard>
          ))}
        </div>
      </FinanceCard>
      <PaymentDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        refetch={refetch}
      />
    </>
  );
}

export default Payments;

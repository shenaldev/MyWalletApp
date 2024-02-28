import { PaymentResponse } from "@/types/types";
//IMPORT COMPONENTS
import PaymentItem from "./PaymentItem";
import CategoryCard from "./CategoryCard";

type PaymentItemsProps = {
  data: PaymentResponse | undefined;
  isLoading: boolean;
};

function PaymentItems({ data, isLoading }: PaymentItemsProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {data?.map((item, index) => (
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
              <PaymentItem key={index} payment={payment} />
            ))}
          </ul>
        </CategoryCard>
      ))}
    </div>
  );
}

export default PaymentItems;

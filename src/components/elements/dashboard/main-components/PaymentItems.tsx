import { PaymentResponse } from "@/types/types";
import CategoryCard from "./CategoryCard";
import PaymentItem from "./PaymentItem";

type PaymentItemsProps = {
  data: PaymentResponse | undefined;
  isLoading: boolean;
};

function PaymentItems({ data, isLoading }: PaymentItemsProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2 divide-y">
      {data?.map((item, index) => (
        <CategoryCard
          key={index}
          details={{ name: item.name, icon: item.icon, total: item.total }}
        >
          <ul className="space-y-2 divide-y font-medium">
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

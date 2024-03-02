import { PaymentReponseCategory } from "@/types/types";
//IMPORT COMPONENTS
import PaymentItem from "./PaymentItem";
import CategoryCard from "../ui/CategoryCard";
import CategoryCardSkeleton from "@/components/ui/skeletons/CategoryCardSkeletion";

type PaymentItemsProps = {
  data: PaymentReponseCategory | undefined;
  isLoading: boolean;
};

function PaymentItems({ data, isLoading }: PaymentItemsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <CategoryCardSkeleton items={5} />
      </div>
    );
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

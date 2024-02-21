import { PaymentsObject } from "@/types/Payment";

type PaymentItemsProps = {
  data: PaymentsObject[];
};

function PaymentItems({ data }: PaymentItemsProps) {
  return data.map((item, index) => (
    <div key={index} className="flex flex-col gap-4">
      {Object.keys(item).map((key, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{key}</h3>
          <div className="flex flex-col gap-2">
            {item[key].map((subItem, index) => (
              <div key={index} className="flex justify-between">
                <p>{subItem.name}</p>
                <p>{subItem.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ));
}

export default PaymentItems;

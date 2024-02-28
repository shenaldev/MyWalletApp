import type { Payment } from "@/types/types";
import dayjs from "dayjs";

function PaymentItem({ payment }: { payment: Payment }) {
  const date = dayjs(payment?.date).format("MM-DD");

  return (
    <li className="flex justify-between gap-4">
      <span>{date}</span>
      <span className="grow text-start">{payment?.name}</span>
      <span>{payment?.amount}</span>
    </li>
  );
}

export default PaymentItem;

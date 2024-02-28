import { Separator } from "@/components/ui/separator";
import type { Payment } from "@/types/types";
import dayjs from "dayjs";

function PaymentItem({ payment }: { payment: Payment }) {
  const date = dayjs(payment?.date).format("MM-DD");

  return (
    <>
      <li className="flex justify-between gap-4 px-3 py-3 duration-500 animate-in hover:bg-blue-100">
        <span>{date}</span>
        <span className="grow text-start">{payment?.name}</span>
        <span>{payment?.amount}</span>
      </li>
      <Separator />
    </>
  );
}

export default PaymentItem;

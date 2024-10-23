import { ReactNode } from "react";

//IMPORT TYPES
import type { Payment } from "@/types/types";
import dayjs from "dayjs";

//IMPORT COMPONENTS
import { Separator } from "@/components/ui/separator";

//IMPORT UTILS
import { numberFormat } from "@/lib/numbers";

type PaymentItemProps = {
  payment: Payment;
  children?: ReactNode;
};

function PaymentItem({ payment, children }: PaymentItemProps) {
  const date = dayjs(payment?.date).format("MM-DD");

  return (
    <>
      <li className="flex items-center justify-between gap-4 p-3 duration-500 animate-in hover:bg-slate-100 dark:hover:bg-slate-800">
        <span>{date}</span>
        <span className="grow text-start capitalize">{payment?.name}</span>
        <span>{numberFormat(payment?.amount || 0)}</span>
        {children}
      </li>
      <Separator />
    </>
  );
}

export default PaymentItem;

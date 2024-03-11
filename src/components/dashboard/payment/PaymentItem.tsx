import { ReactNode } from "react";
import dayjs from "dayjs";
//IMPORT TYPES
import type { Payment } from "@/types/types";
//IMPORT COMPONENTS
import { Separator } from "@/components/ui/separator";
//IMPORT UTILS
import { numberFormat } from "@/lib/Numbers";

type PaymentItemProps = {
  payment: Payment;
  children?: ReactNode;
};

function PaymentItem({ payment, children }: PaymentItemProps) {
  const date = dayjs(payment?.date).format("MM-DD");

  return (
    <>
      <li className="hover:bg-itemHover flex items-center justify-between gap-4 px-3 py-3 duration-500 animate-in">
        <span>{date}</span>
        <span className="grow text-start">{payment?.name}</span>
        <span>{numberFormat(payment?.amount || 0)}</span>
        {children}
      </li>
      <Separator />
    </>
  );
}

export default PaymentItem;

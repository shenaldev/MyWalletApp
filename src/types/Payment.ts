import type { Category } from "./Categories";

export type Payment = {
  id: number;
  name: string;
  amount: string;
  date: string;
  currency: string;
  category_id: number;
  payment_method_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

interface PaymentCategory extends Category {
  payments: Payment[] | [];
  total: number;
}

export type PaymentReponseCategory = PaymentCategory[];

export type PaymentResponse = {
  payments: PaymentCategory[];
  total: number | string;
};

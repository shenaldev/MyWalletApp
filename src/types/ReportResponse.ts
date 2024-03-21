export type PaymentTotalByCategory = {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  total: string;
};

export type TotalByMonth = {
  total: string;
  month: number;
};

export type ReportResponse = {
  payment_by_category: PaymentTotalByCategory[];
  payment_by_month: TotalByMonth[];
  total_payment: string;
  total_income: string;
  income_by_month: TotalByMonth[];
};

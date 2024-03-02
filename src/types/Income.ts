export type Income = {
  id: number;
  source: string;
  amount: string;
  date: string;
  currency: string;
  user_id: number;
  created_at: string | null;
  updated_at: string | null;
};

export type IncomeResponse = {
  incomes: Income[];
  total: number;
};

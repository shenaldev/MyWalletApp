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

export type IncomeNote = {
  id: number;
  note: string;
  income_id: number;
  created_at: null | string;
  updated_at: null | string;
};

export type Payment = {
  name: string;
  price: number;
  date: string;
};

export type PaymentsObject = {
  [key: string]: Payment[];
};

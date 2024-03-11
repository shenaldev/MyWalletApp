export type { Category } from "./Categories";
export type { Payment } from "./Payment";
export type { PaymentMethod } from "./PaymentMethod";
export type { User } from "./User";
export type { PaymentResponse } from "./Payment";
export type { SinglePaymentResponse } from "./Payment";
export type { PaymentReponseCategory } from "./Payment";
export type { Income } from "./Income";
export type { IncomeResponse } from "./Income";

export type InputSelectOption = {
  name: string;
  value: string;
};

export type ActionType = "view" | "edit" | "delete";

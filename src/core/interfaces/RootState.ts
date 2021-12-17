import { Customer } from "./Customer";

export interface RootState {
  [key: string]: any;
  customer: Customer;
  error: Record<string, boolean>;
  loading: Record<string, boolean>;
}

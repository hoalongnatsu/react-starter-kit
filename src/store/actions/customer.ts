import { Customer } from "@core/interfaces";

export const SET_CUSTOMER_INFO = "SET_CUSTOMER_INFO";
export const CLEAR_CUSTOMER_INFO = "CLEAR_CUSTOMER_INFO";

export function set_customer_info(info: Customer) {
  return {
    type: SET_CUSTOMER_INFO,
    payload: { info },
  };
}

export function clear_customer_info() {
  return {
    type: CLEAR_CUSTOMER_INFO,
  };
}

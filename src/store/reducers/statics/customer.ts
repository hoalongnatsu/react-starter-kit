import {
  CLEAR_CUSTOMER_INFO,
  SET_CUSTOMER_INFO,
} from "@store/actions/customer";

import { AnyAction } from "redux";
import { Customer } from "@core/interfaces";

const customerState = {} as Customer;

export default function customer(state = customerState, action: AnyAction) {
  switch (action.type) {
  case SET_CUSTOMER_INFO: {
    const { info } = action.payload;

    return { ...info };
  }

  case CLEAR_CUSTOMER_INFO: {
    return {};
  }

  default:
    return state;
  }
}

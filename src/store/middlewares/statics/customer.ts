// import * as actions from "@store/actions/customer";

// import { call, put, takeLatest } from "redux-saga/effects";

// import { AnyAction } from "redux";
// import customerApi from "@core/services/customer";

// function* get_customer_info_worker(action: AnyAction) {
//   try {
//     const address: ReturnType<typeof customerApi.getListAddress> = yield call(
//       customerApi.getListAddress,
//     );

//     const payload = {
//       address,
//     };
//     yield put({
//       type: actions.GET_CUSTOMER_ADDRESS_SUCCESS,
//       payload,
//     });
//   } catch (error) {
//     yield put({
//       type: actions.GET_CUSTOMER_ADDRESS_FAILURE,
//     });
//   }
// }

export function* get_customer_address() {
  // yield takeLatest(
  //   actions.GET_CUSTOMER_ADDRESS_REQUEST,
  //   get_customer_info_worker,
  // );
}

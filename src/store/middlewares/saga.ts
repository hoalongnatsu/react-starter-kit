import { all } from "redux-saga/effects";

// import { get_customer_address } from "./statics/customer";

const rootSaga = (listSagas: any[] = []) => function* () {
  yield all([
    ...listSagas,
    // get_customer_address(),
  ]);
};

export default rootSaga;

import { Action } from "redux";
import { namespace } from "@modules/Sample/config/constants";

export interface SampleState {
  name: string;
}

const initialState: SampleState = { name: "sample" };

export const name = `${namespace}_sample`;
export default function sample(state: SampleState = initialState, action: Action<string>) {
  switch (action.type) {
  default:
    return state;
  }
}

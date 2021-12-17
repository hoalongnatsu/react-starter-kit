import { Action } from "redux";

export default function loading(state: Record<string, any> = {}, action: Action<string>) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === "REQUEST",
  };
}

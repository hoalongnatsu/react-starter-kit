import sampleReducer, { name } from "@modules/Sample/reducers/sample";

import { Provider } from "react-redux";
import { RootState } from "@core/interfaces";
import SamplePage from "./SamplePage";
import { createReducer } from "@store/reducers";
import { createStore } from "redux";
import { render } from "@testing-library/react";

function renderWithProviders(
  component: any,
  state: Partial<RootState> = {},
) {
  const store = createStore(createReducer({ [name]: sampleReducer }), state);
  return render(<Provider store={store}>{component}</Provider>);
}

test("renders Sample Page", () => {
  const { getByText } = renderWithProviders(<SamplePage />, {
    [name]: { name: "sample" },
  });

  expect(getByText("sample")).toBeInTheDocument();
});

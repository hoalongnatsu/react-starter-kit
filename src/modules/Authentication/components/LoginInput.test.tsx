import { fireEvent, render, waitFor } from "@testing-library/react";

import { Form } from "antd";
import { IntlProvider } from "react-intl";
import LoginInput from "./LoginInput";
import { BrowserRouter as Router } from "react-router-dom";
import { defaultResource } from "@core/constants/resource";

function renderWithProviders(component: any) {
  return render(
    <Router>
      <IntlProvider locale="en" messages={defaultResource.message["en"]}>
        {component}
      </IntlProvider>
    </Router>,
  );
}

describe("Login", () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    jest.spyOn(console, "warn").mockImplementation();
  });

  test("called onFinish when submit with valid email and password", async () => {
    const onFinish = jest.fn();

    const { getByLabelText, getByText } = renderWithProviders(
      <Form onFinish={onFinish}>
        <LoginInput />
      </Form>,
    );

    await fireEvent.change(getByLabelText("Email"), {
      target: { value: "a@a.com" },
    });
    await fireEvent.change(getByLabelText("Password"), {
      target: { value: "12345678" },
    });
    await fireEvent.click(getByText("Login"));
    await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
  });
});

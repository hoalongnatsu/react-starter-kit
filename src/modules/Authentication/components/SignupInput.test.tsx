import { fireEvent, render, waitFor } from "@testing-library/react";

import { Button } from "antd";
import { Form } from "antd";
import { IntlProvider } from "react-intl";
import SignupInput from "./SignupInput";
import { defaultResource } from "@core/constants/resource";

function renderWithProviders(component: any) {
  return render(
    <IntlProvider locale="en" messages={defaultResource.message["en"]}>
      {component}
    </IntlProvider>,
  );
}

describe("Signup", () => {
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

  test("called onFinish when submit with valid email, password, confirm password and full name", async () => {
    const onFinish = jest.fn();
    const { getByLabelText, getByText } = renderWithProviders(
      <Form onFinish={onFinish}>
        <SignupInput />
        <Button htmlType="submit">
          Signup
        </Button>
      </Form>,
    );

    await fireEvent.change(getByLabelText("Email"), {
      target: { value: "a@a.com" },
    });
    await fireEvent.change(getByLabelText("Password"), {
      target: { value: "12345678" },
    });
    await fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "12345678" },
    });
    await fireEvent.change(getByLabelText("Full name"), {
      target: { value: "a" },
    });
    await fireEvent.click(getByText("Signup"));
    await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
  });
});



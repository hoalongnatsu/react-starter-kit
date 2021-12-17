import { fireEvent, render, waitFor } from "@testing-library/react";

import { Button } from "antd";
import { Form } from "antd";
import { IntlProvider } from "react-intl";
import SignupInput from "./SignupInput";
import { defaultResource } from "@core/contants/resource";

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

  test("show error validate email when input wrong email format", async () => {
    const { getByLabelText } = renderWithProviders(
      <Form>
        <SignupInput />
      </Form>,
    );

    await fireEvent.change(getByLabelText("Email"), {
      target: { value: "a@" },
    });
    await fireEvent.blur(getByLabelText("Email"));
    expect(console.warn).toHaveBeenCalledWith("async-validator:", [
      "'email' is not a valid email",
    ]);
  });

  test("show error validate password when input wrong password format", async () => {
    const { getByLabelText } = renderWithProviders(
      <Form>
        <SignupInput />
      </Form>,
    );

    await fireEvent.change(getByLabelText("Password"), {
      target: { value: "1234567" },
    });
    await fireEvent.blur(getByLabelText("Password"));
    expect(console.warn).toHaveBeenCalledWith("async-validator:", [
      "'password' must be at least 8 characters",
    ]);
  });

  test("show error validate when input all is empty", async () => {
    const onFinish = jest.fn();
    const { getByText } = renderWithProviders(
      <Form onFinish={onFinish}>
        <SignupInput />
        <Button htmlType="submit">
          Signup
        </Button>
      </Form>,
    );

    await fireEvent.click(getByText("Signup"));
    expect(console.warn).toHaveBeenCalledWith("async-validator:", [
      "'email' is required",
    ]);
    expect(console.warn).toHaveBeenCalledWith("async-validator:", [
      "'password' is required",
    ]);
    expect(console.warn).toHaveBeenCalledWith("async-validator:", [
      "'confirm_password' is required",
    ]);
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



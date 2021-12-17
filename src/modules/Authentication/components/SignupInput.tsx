import { Form, Input } from "antd";

import useTranslate from "@core/hooks/useTranslate";

const SignupInput = () => {
  const [t] = useTranslate();

  return (
    <>
      <Form.Item
        name="email"
        label={t("common:email")}
        validateTrigger="onBlur"
        rules={[
          {
            type: "email",
            message: t("validate:input-not-valid", undefined, {
              value: t("common:email"),
            }),
          },
          {
            required: true,
            message: t("validate:required", undefined, {
              value: t("common:email"),
            }),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label={t("common:password")}
        extra={t("authentication:password-help")}
        hasFeedback
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: t("validate:required", undefined, {
              value: t("common:password"),
            }),
          },
          {
            min: 8,
            message: t("validate:field-gte", undefined, { length: 8 }),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label={t("common:confirm-password")}
        dependencies={["password"]}
        hasFeedback
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: t("validate:required", undefined, {
              value: t("common:confirm-password"),
            }),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("authentication:validate-confirm-password")),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="full_name"
        label={t("common:full-name")}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default SignupInput;

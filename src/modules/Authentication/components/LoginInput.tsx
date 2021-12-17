import { Button, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {
  loading?: boolean;
}

const LoginForm = ({ loading }: Props) => {
  const [t] = useTranslate();

  return (
    <>
      <Form.Item style={{ marginBottom: 100 }}>
        <div className="logo-brand text-center">
          <Button>Logo</Button>
        </div>
      </Form.Item>
      <Form.Item
        label={t("common:email")}
        name="email"
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("common:email")}
        />
      </Form.Item>
      <Form.Item
        label={t("common:password")}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            min: 8,
            message: t("validate:field-gte", undefined, { length: 8 }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("common:password")}
        />
      </Form.Item>
      <Form.Item>
        <Row className="text-center">
          <Col span={8}>
            <Link to="/signup">{t("common:signup")}</Link>
          </Col>
          <Col span={8}>
            <Link to="/">{t("common:find-account")}</Link>
          </Col>
          <Col span={8}>
            <Link to="/">{t("common:find-password")}</Link>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block={true} loading={loading}>
          {t("common:login")}
        </Button>
      </Form.Item>
    </>
  );
};

export default LoginForm;

interface Props {}

import { Button, Col, Form, Row, Typography, message } from "antd";
import { useContext, useState } from "react";

import Auth from "@utils/helpers/auth";
import ResourceContext from "@utils/contexts/Resource";
import SignupInput from "@modules/Authentication/components/SignupInput";
import { ValuesSignupForm } from "@modules/Authentication/interfaces";
import authApi from "@modules/Authentication/services/auth";
import { set_customer_info } from "@store/actions/customer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

const { Title } = Typography;

const Signup = (props: Props) => {
  const [t] = useTranslate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setResourceContext } = useContext(ResourceContext);

  /* State */
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ValuesSignupForm) => {
    setLoading(true);

    try {
      const { token, data } = await authApi.signup(values);

      Auth.setToken(token);
      dispatch(set_customer_info(data));
      setResourceContext().then(() => {
        message.success(t("authentication:signup-success"));
        history.push("/");
      });
    } catch (error: any) {
      const { response } = error;

      if (response && response.data) {
        const { data } = response.data;

        if (!Array.isArray(data)) {
          message.error(data);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <Title level={3}>{t("authentication:join-the-membership")}</Title>
      <div className="signup">
        <Form layout="vertical" form={form} name="register" onFinish={onFinish}>
          <Row gutter={32}>
            <Col lg={10}>
              <SignupInput />
            </Col>
            <Col lg={10} offset={2}>
              <Button
                htmlType="submit"
                style={{ marginTop: 20 }}
                type="primary"
                block={true}
                loading={loading}
              >
                {t("common:signup")}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

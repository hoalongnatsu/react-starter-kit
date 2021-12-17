import { Card, Form, Row, message } from "antd";
import { useContext, useState } from "react";

import Auth from "@utils/helpers/auth";
import LoginInput from "@modules/Authentication/components/LoginInput";
import ResourceContext from "@utils/contexts/Resource";
import { ValuesLoginForm } from "@modules/Authentication/interfaces";
import authApi from "@modules/Authentication/services/auth";
import { set_customer_info } from "@store/actions/customer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

const Login = (props: Props) => {
  const [t] = useTranslate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setResourceContext } = useContext(ResourceContext);

  /* State */
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ValuesLoginForm) => {
    setLoading(true);

    try {
      const { token, data } = await authApi.login(values);

      Auth.setToken(token);
      dispatch(set_customer_info(data));
      setResourceContext().then(() => {
        message.success(t("authentication:login-success"));
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
      <Row justify="space-around" align="middle" style={{ minHeight: "calc(100vh - 125px)" }}>
        <Card>
          <Form
            form={form}
            style={{ width: 479 }}
            layout="vertical"
            name="login-form"
            className="login-form"
            validateTrigger="onBlur"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <LoginInput loading={loading} />
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default Login;

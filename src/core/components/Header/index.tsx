import { Button, Col, Dropdown, Menu, Row, message } from "antd";

import Auth from "@utils/helpers/auth";
import { GlobalOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LocaleContext from "@utils/contexts/Locale";
import ResourceContext from "@utils/contexts/Resource";
import { clear_customer_info } from "@store/actions/customer";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {
  authenticated: boolean;
}

const Header = ({ authenticated }: Props) => {
  const [t] = useTranslate();
  const history = useHistory();
  const dispatch = useDispatch();
  const { setLocaleContext } = useContext(LocaleContext);
  const { setResourceContext } = useContext(ResourceContext);

  const goToPage = (path: string) => history.push(path);

  const changeLocale = (locale: string) => {
    setLocaleContext(locale);
    localStorage.setItem("lang", locale);
  };

  const logout = () => {
    Auth.clearToken();
    dispatch(clear_customer_info());
    setResourceContext().then(() => {
      message.success(t("authentication:logout-success"));
      history.push("/");
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="vi" onClick={() => changeLocale("vi")}>
        Vietname
      </Menu.Item>
      <Menu.Item key="en" onClick={() => changeLocale("en")}>
        English
      </Menu.Item>
      <Menu.Item key="ko" onClick={() => changeLocale("ko")}>
        Korean
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="container">
        <Row justify="space-between">
          <Col lg={2}>
            <Button onClick={() => goToPage("/")}>Logo</Button>
          </Col>
          <Col lg={12} className="menu">
            <Button>{t("common:search")}</Button>
            {authenticated ? (
              <>
                <Button
                  onClick={() => goToPage("/customer/mypage")}
                  type="primary"
                >
                  {t("common:my-page")}
                </Button>
                <Button onClick={logout} type="primary">
                  {t("common:logout")}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => goToPage("/login")}>
                  {t("common:login")}
                </Button>
                <Button onClick={() => goToPage("/signup")}>
                  {t("common:signup")}
                </Button>
              </>
            )}
            <Dropdown trigger={["click"]} overlay={menu}>
              <GlobalOutlined />
            </Dropdown>
          </Col>
        </Row>
      </header>
      <Menu mode="horizontal" style={{ height: "100%", border: 0 }}>
        <Menu.Item key="sample-page">
          <Link to="/sample/sample-page">Sample Page</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Header;

import { ModuleConfig } from "@core/interfaces";

const config: ModuleConfig = {
  name: "Authentication",
  baseUrl: "",
  routes: [
    {
      path: "/login",
      page: "Login",
      title: "Login",
      exact: true,
    },
    {
      path: "/signup",
      page: "Signup",
      title: "Signup",
      exact: true,
    },
  ],
  requireAuthenticated: false,
};

export default config;

import { ModuleConfig } from "@core/interfaces";

const config: ModuleConfig = {
  name: "Home",
  baseUrl: "/",
  routes: [
    {
      path: "/",
      page: "MainPage",
      title: "Home",
      exact: true,
    },
  ],
  requireAuthenticated: "any",
};

export default config;

import { ModuleConfig } from "@core/interfaces";
import { name as sample } from "@modules/Sample/reducers/sample";

const config: ModuleConfig = {
  name: "Sample",
  baseUrl: "/sample",
  routes: [
    {
      path: "/sample-page",
      page: "SamplePage",
      title: "Sample Page",
      exact: true,
      reducer: {
        name: sample,
        resource: "sample",
      },
    },
  ],
  requireAuthenticated: "any",
};

export default config;

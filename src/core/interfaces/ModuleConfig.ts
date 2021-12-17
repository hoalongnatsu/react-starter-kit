interface ReducerConfig {
  name: string;
  resource: string;
}

export interface RouteConfig {
  path: string;
  page: string;
  title: string;
  exact?: boolean;
  reducer?: ReducerConfig[] | ReducerConfig;
}

export interface ModuleConfig {
  name: string;
  baseUrl: string;
  routes: RouteConfig[];
  requireAuthenticated: boolean | "any";
}

export interface MenuConfig {
  path: string;
  key: string;
  label: string;
}

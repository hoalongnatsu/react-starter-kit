import { Route, Switch, useHistory, useLocation } from "react-router";
import { Suspense, lazy, useEffect, useState } from "react";

import ErrorBoundary from "@core/components/ErrorBoundary";
import { Helmet } from "react-helmet-async";
import { RouteResource } from "@core/constants/resource";
import TopBarProgress from "react-topbar-progress-indicator";
import { store } from "@root/App";

TopBarProgress.config({
  barColors: {
    0: "#FF5F6D",
    "1.0": "#FF5F6D",
  },
});

const LoadableLoading = ({ delay = 300 }: { delay?: number }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <TopBarProgress /> : null;
};

const RouteWithTitle = ({
  exact,
  title,
  path,
  module,
  page,
  reducer,
}: RouteResource) => {
  const lazyComponent = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */
      `@modules/${module}/pages/${page}`
    ).then(async (component) => {
      if (reducer) {
        if (Array.isArray(reducer)) {
          const reducers = await Promise.all(
            reducer.map(async (r) => {
              const m = await import(
                /* webpackChunkName: "[request]" */
                `@modules/${module}/reducers/${r.resource}`
              );

              return { name: r.name, default: m.default };
            }),
          );

          reducers.forEach((reducer) =>
            store.addReducer(reducer.name, reducer.default),
          );
        } else {
          const m = await import(
            /* webpackChunkName: "[request]" */
            `@modules/${module}/reducers/${reducer.resource}`
          );

          store.addReducer(reducer.name, m.default);
        }
      }

      return component;
    }),
  );

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Route exact={exact} path={path} component={lazyComponent} />
    </ErrorBoundary>
  );
};

interface Props {
  routes: RouteResource[];
  authenticated: boolean;
}

const Routes = ({ routes, authenticated }: Props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (authenticated) {
      if (location.pathname === "/") {
        console.log("redirect");
      }
    }
  }, [authenticated, history, location]);

  return (
    <Suspense fallback={<LoadableLoading />}>
      <Switch>
        {routes.map((route) => (
          <RouteWithTitle key={route.path} {...route} />
        ))}
        <RouteWithTitle
          path="*"
          title="Not Found"
          module="System"
          page="NotFound"
        />
      </Switch>
    </Suspense>
  );
};

Routes.defaultProps = {
  routes: [],
};

export default Routes;

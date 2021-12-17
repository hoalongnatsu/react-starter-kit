import { ModuleConfig } from "@core/interfaces";
import Path from "@utils/helpers/path";
import cloneDeep from "lodash.clonedeep";
import { defaultResource } from "@core/constants/resource";
import modules from "@modules";

class Resource {
  public static async init(authenticated: boolean) {
    /**
     * @var {resource}
     * @property {initiated} // init state of application
     * @property {routes} // array router and page component of application
     * @property {message} // translate
     * @property {authenticated} // check user have authenticated yet
     * Ex value:
     * let resource = {
        initiated: false,
        routes: [],
        message: {
          en: messageEn,
        },
        authenticated: false,
      };
    */
    const resource = cloneDeep(defaultResource);

    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];

      try {
        const config: ModuleConfig =
          require(`@modules/${module}/bootstraps.ts`).default;

        if (
          config.requireAuthenticated === "any" ||
          config.requireAuthenticated === undefined ||
          config.requireAuthenticated === authenticated
        ) {
          for (let j = 0; j < config.routes.length; j++) {
            // eslint-disable-next-line prefer-const
            let { path, exact, ...rest } = config.routes[j];
            path = `${Path.trim(config.baseUrl)}/${Path.trim(path)}`;
            path = Path.trim(path);
            path = `/${path}`;

            resource.routes.push({
              ...rest,
              module,
              exact: exact || false,
              path,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    resource.initiated = true;
    resource.authenticated = authenticated;
    return resource;
  }
}

export default Resource;

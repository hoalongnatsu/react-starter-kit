import { Resource, defaultResource } from "@core/constants/resource";

import React from "react";

type SetResourceFn = () => Promise<void>;

export default React.createContext({
  resource: defaultResource,
  setResourceContext: () => {},
} as { resource: Resource; setResourceContext: SetResourceFn });

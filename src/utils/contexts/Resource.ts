import React from "react";
import { Resource } from "@core/contants/resource";
import { defaultResource } from "@core/contants/resource";

type SetResourceFn = () => Promise<void>;

export default React.createContext({
  resource: defaultResource,
  setResourceContext: () => {},
} as { resource: Resource; setResourceContext: SetResourceFn });

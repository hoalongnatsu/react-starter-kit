import React from "react";

export default React.createContext({
  locale: "en",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocaleContext: (locale: string) => {},
});

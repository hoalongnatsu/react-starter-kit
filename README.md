## Run source
```
yarn install
yarn start:dev
```
## Module structure
```bash
src/modules/Sample/
├── bootstraps.ts
├── config
│   └── constants.ts
├── pages
│   └── SamplePage.tsx
├── reducers
│   └── sample.ts
└── services
    └── sample.ts
```

bootstraps.ts
```javascript
import { ModuleConfig } from "@core/interfaces";
import { name as sample } from "@modules/Sample/reducers/sample";

const config: ModuleConfig = {
  name: "Sample", // name of the folder module
  baseUrl: "/sample", // base url
  routes: [
    {
      path: "/sample-page", // url of the page => http://example.com/sample/sample-page
      page: "SamplePage", // name of the file in pages folder
      title: "Sample Page", // title of the page
      exact: true, // config exact in Route of react-router-dom
      reducer: { // reducer config, single or array
        name: sample, // name of state in store
        resource: "sample" // name of the file in folder reducer
      }
    }
  ],
  requireAuthenticated: false // need login to access page or not. If value = "any", login or not login both can access
}

export default config;
```

config/constants.ts
```javascript
export const namespace = "namespace:sample"; // define namespace of module
```

reducers/sample.ts
```javascript
import { Action } from "redux";

interface SampleState {
}

const initialState: SampleState = {};

export const name = `${namespace}_sample`; // name of state in store, concat with namespace to prevent conflict state name with other namespace
export default function sample(state: SampleState = initialState, action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
```

services/sample.ts
```javascript
import BaseService from "@core/class/BaseService";
import { Object } from "@core/interfaces";

class SampleService extends BaseService { // need to extends BaseService

  list = (body: Object<string>) => {
    return this.get("/sample", body);
  }

}

export default new SampleService("/api", false);
```

## Testing
### Jest

```
yarn jest:testing
```

### Cypress

```
yarn cypress
```

## Config env file

Open .env-cmdrc file

```.env-cmdrc
{
  "dev": {
    "PORT": "3000",
    "REACT_APP_STAGE": "dev",
    "REACT_APP_API_URL": "http://localhost:3001",
    "REACT_APP_STORAGE_URL": "http://localhost:3001"
  },
  "testing": {
    "PORT": "3000",
    "REACT_APP_STAGE": "testing",
    "REACT_APP_API_URL": "http://localhost:3001",
    "REACT_APP_STORAGE_URL": "http://localhost:3001"
  }
}
```

Import env in src/configs/env.ts file

```src/configs/env.ts
export const CURRENT_ENV = {
  APP_STAGE: process.env.REACT_APP_STAGE,
  API_URL: process.env.REACT_APP_API_URL,
  STORAGE_URL: process.env.REACT_APP_STORAGE_URL,
};
```

**Env need prefix with REACT_APP_**

Use:
+ yarn start:dev => load env in dev
+ yarn start:testing => load env in testing

## Support Dockerfile for CI/CD

### Build and run test image with Jest

```
docker build . --target test -t md-frontend-test
docker run --rm -e FORCE_COLOR=true -e CI=true md-frontend-test jest:testing --verbose
```

### Test with cypress
Use image `cypress/browsers:node12.14.1-chrome85-ff81` for build image test. 

```Dockerfile
FROM cypress/browsers:node12.14.1-chrome85-ff81
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm ci
CMD ["yarn", cy:test""]
```

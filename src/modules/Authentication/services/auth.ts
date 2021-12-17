import {
  ValuesLoginForm,
  ValuesSignupForm,
} from "@modules/Authentication/interfaces";

import BaseService from "@core/class/BaseService";
import { Customer } from "@core/interfaces/Customer";

class AuthService extends BaseService {
  public login = (body: ValuesLoginForm) => {
    return this.post("/login", body);
  };

  public signup = (
    values: ValuesSignupForm,
  ): Promise<{ token: string; data: Customer }> => {
    return this.post("/signup", values);
  };
}

export default new AuthService("/api/auth", false);

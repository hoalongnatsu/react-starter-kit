class Auth {
  public static getToken() {
    return localStorage.getItem("token");
  }

  public static setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public static clearToken() {
    localStorage.removeItem("token");
    const persist = JSON.parse(localStorage.getItem("persist:root") || "{}");
    persist.customer = { address: {} };
    localStorage.setItem("persist:root", JSON.stringify(persist));
  }

  public static authenticated() {
    const token = Auth.getToken();

    if (token && token.includes("Bearer")) {
      return true;
    }

    return false;
  }

}

export default Auth;

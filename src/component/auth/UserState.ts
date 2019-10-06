import { Permission, User } from "../../graphql/types";

const TOKEN_KEY = "auth.token";

export const UserState = new (class {
  public token?: string;
  private user?: User;

  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY) || undefined;
  }

  setAuth(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
    this.user = user;
  }

  removeAuth() {
    localStorage.removeItem(TOKEN_KEY);
    delete this.token;
    this.user = undefined;
  }

  get isAuthenticated() {
    return !!this.token;
  }

  isAuthorized(permission: Permission): boolean {
    return !!this.user && this.user.permissions.includes(permission);
  }
})();

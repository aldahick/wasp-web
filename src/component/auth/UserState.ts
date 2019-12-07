import { Permission, User } from "../../graphql/types";

const TOKEN_KEY = "wasp.auth.token";
const USER_KEY = "wasp.auth.user";

export const UserState = new (class {
  token?: string;
  private user?: User;

  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY) || undefined;
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      this.user = JSON.parse(userJson) || undefined;
    }
  }

  setAuth(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  removeAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete this.token;
    delete this.user;
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  isAuthorized(permission: Permission): boolean {
    return !!this.user && this.user.permissions.includes(permission);
  }
})();

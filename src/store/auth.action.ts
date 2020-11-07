import { ThunkAction } from "redux-thunk";
import { apiUrl } from "../util/config";
import { AuthState } from "./auth.state";

export type AuthActions = AuthLoginAction | AuthLogoutAction;
export interface AuthLoginAction {
  type: "Login";
  userData: UserData;
}
export interface AuthLogoutAction {
  type: "Logout";
}
export interface UserData {
  api_key: string;
  email: string;
  group: string;
}

export default {
  login: (
    user: string,
    password: string
  ): ThunkAction<Promise<void>, AuthState, undefined, AuthLoginAction> => {
    return (dispatch) => {
      return fetch(`${apiUrl}/authentication-v1/`, {
        method: "POST",
        body: JSON.stringify({ user, password }),
      })
        .then((x) => {
          if (x.status !== 200) return Promise.reject();
          return x.json();
        })
        .then((userData) => {
          dispatch({ type: "Login", userData });
        });
    };
  },
  setCredentials: (userData: UserData): AuthLoginAction => ({
    type: "Login",
    userData,
  }),
  logout: (): AuthLogoutAction => ({
    type: "Logout",
  }),
};

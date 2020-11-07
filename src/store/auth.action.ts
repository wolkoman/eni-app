import { ThunkAction } from "redux-thunk";
import { apiUrl } from "../util/config";
import { AuthState } from "./auth.state";

export interface Credentials {
  api_key: string;
  email: string;
  group: string;
}
export type AuthActions =
  | { type: "Login"; credentials: Credentials }
  | { type: "Logout" };
export const authLogin = (
  user: string,
  password: string
): ThunkAction<Promise<void>, AuthState, undefined, AuthActions> => {
  return (dispatch) => {
    return fetch(`${apiUrl}/authentication-v1/`, {
      method: "POST",
      body: JSON.stringify({ user, password }),
    })
      .then((x) => {
        if (x.status !== 200) return Promise.reject();
        return x.json();
      })
      .then((x) => {
        dispatch(authLoginAction(x));
      });
  };
};

const authLoginAction = (credentials: Credentials): AuthActions => ({
  type: "Login",
  credentials,
});
export const authLogout = (): AuthActions => ({
  type: "Logout",
});

import { Reducer } from "react";
import { Action } from "redux";
import { AuthActions } from "./auth.action";
import { AuthState } from "./auth.state";

export const authReducer: Reducer<AuthState, Action> = (
  state: AuthState = {},
  action: AuthActions
) => {
  switch (action.type) {
    case "Login":
      return {
        userdata: action.credentials,
      };
    case "Logout":
      return { userdata: undefined };
    default:
      return state;
  }
};

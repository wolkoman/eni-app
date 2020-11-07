import { createSelector } from "reselect";
import { State } from "./state";

const getAuth = (state: State) => state.auth;

export const isOrganist = createSelector([getAuth], (auth) => {
  return auth.userdata
    ? ["admin", "Organist"].includes(auth.userdata?.group)
    : false;
});

export const isLoggedIn = createSelector([getAuth], (auth) => {
  return !!auth.userdata;
});

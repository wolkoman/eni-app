import { createSelector } from "reselect";
import { State } from "./state";

const getAuth = (state: State) => state.auth;

export const getApiKey = createSelector([getAuth], auth => {
  return auth.userdata ? auth.userdata.api_key : "";
});
export const isAdmin = createSelector([getAuth], auth => {
  return auth.userdata ? ["admin"].includes(auth.userdata?.group) : false;
});
export const isOrganist = createSelector([getAuth], auth => {
  return auth.userdata
    ? ["admin", "Organist"].includes(auth.userdata?.group)
    : false;
});

export const isLoggedIn = createSelector([getAuth], auth => {
  return !!auth.userdata;
});

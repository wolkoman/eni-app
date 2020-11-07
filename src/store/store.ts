import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth.reducer";
import { State } from "./state";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {}
};

const rootReducer = combineReducers({ auth: authReducer as any });
export const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState() as State);
});

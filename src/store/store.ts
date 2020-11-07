import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth.reducer";

const rootReducer = combineReducers({ auth: authReducer as any });
export const store = createStore(rootReducer, applyMiddleware(thunk));

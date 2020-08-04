import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./reducers/auth";
import error from "./reducers/error";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const initialState = {};

const store = createStore(
  combineReducers({
    auth: auth,
    errors: error,
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
 
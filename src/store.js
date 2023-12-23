import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";
import { thunk } from "redux-thunk";

const store = createStore(
  combineReducers({
    account: accountReducer,
    customer: customerReducer,
  }),
  applyMiddleware(thunk)
);

export default store;

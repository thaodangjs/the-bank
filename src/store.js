import { createStore } from "redux";
import accountReducer from "./features/account/accountSlice";

const store = createStore(accountReducer);

export default store;

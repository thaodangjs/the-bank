import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      //Later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};

store.dispatch(deposit(5000));
console.log(store.getState());

const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};

store.dispatch(withdraw(50));
console.log(store.getState());

const requestLoan = (num, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: num, loanPurpose: purpose },
  };
};
store.dispatch(requestLoan(1000, "buy a iphone"));
console.log(store.getState());

const payLoan = () => {
  return { type: "account/payLoan" };
};
store.dispatch(payLoan());
console.log(store.getState());

const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};

store.dispatch(createCustomer("Alice", "22445665"));
console.log(store.getState());
store.dispatch(updateName("Daniel"));
console.log(store.getState());

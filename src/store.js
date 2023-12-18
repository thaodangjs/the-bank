import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

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

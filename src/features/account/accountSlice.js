const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (state.balance >= action.payload)
        return { ...state, balance: state.balance - action.payload };
      return state;
    case "account/requestLoan":
      if (state.loan === 0)
        return {
          ...state,
          loan: action.payload.loanAmount,
          loanPurpose: action.payload.purpose,
          balance: state.balance + action.payload.loanAmount,
        };
      return state;
    case "account/payLoan":
      if (state.balance > state.loan)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
          loanPurpose: "",
        };
      return state;
    default:
      return state;
  }
};

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
const requestLoan = (loanAmount, purpose) => {
  return { type: "account/requestLoan", payload: { loanAmount, purpose } };
};
const payLoan = () => {
  return { type: "account/payLoan" };
};

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };

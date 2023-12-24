import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance >= action.payload) state.balance -= action.payload;
      return;
    },
    requestLoan: {
      prepare(loanAmount, purpose) {
        return { payload: { loanAmount, purpose } };
      },
      reducer(state, action) {
        if (state.loan <= 0) {
          state.loan = action.payload.loanAmount;
          state.loanPurpose = action.payload.purpose;
          state.balance += state.loan;
        }
        return;
      },
    },
    payLoan(state) {
      if (state.balance >= state.loan) {
        state.balance -= state.loan;
        state.loan = 0;
        state.loanPurpose = "";
      }
      return;
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/converting" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: "account/deposit", payload: data.rates["USD"] });
  };
};

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
/*

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      if (state.balance >= action.payload)
        return { ...state, balance: state.balance - action.payload };
      return state;
    case "account/requestLoan":
      if (state.loan <= 0)
        return {
          ...state,
          balance: state.balance + state.loan,
          loan: action.payload.loanAmount,
          loanPurpose: action.payload.purpose,
        };
      return state;
    case "account/payLoan":
      if (state.balance >= state.loan)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
          loanPurpose: "",
        };
      return state;

    case "account/converting":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/converting" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: "account/deposit", payload: data.rates["USD"] });
  };
};

export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};

export const requestLoan = (loanAmount, purpose) => {
  return { type: "account/requestLoan", payload: { loanAmount, purpose } };
};

export const payLoan = () => {
  return { type: "account/payLoan" };
};

*/

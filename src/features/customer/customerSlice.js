const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: new Date().toISOString(),
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export const createCustomer = (fullName, nationalID) => {
  return { type: "customer/createCustomer", payload: { fullName, nationalID } };
};

export const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};

const UserReducer = (state, action) => {

  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return {};
    default:
      throw Error("Action name not defined");
  }
};

export default UserReducer;

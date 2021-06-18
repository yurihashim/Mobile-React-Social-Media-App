const FeedReducer = (state, action) => {

  console.log("inside reducer state is ", state);
  console.log("action.payload is ", action.payload);


  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        imageData: action.payload.hits
      };
    case "LIKE":
      return {
        ...state,
        imageData: state.imageData.map(e => e.id === action.payload.id ? action.payload : e)
      };
    //Yuri's reducer
    //UPLOAD

    // case "ADD_LIKES":
    //   return {
    //     localStorage.setItem("likes", action.payload)
    //   };


    default:
      throw Error("Action name not defined");
  }
};

export default FeedReducer;

const FeedReducer = (state, action) => {

  console.log("inside reducer state is ", state);
  console.log("action.payload is ", action.payload);

  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        imageData: action.payload.hits,
        favorite: [],
        comments: []
      };
    case "LIKE":
      return {
        ...state,
        imageData: state.imageData.map(e => e.id === action.payload.id ? action.payload : e)
      };
    case "ADD_FAVORITES":
      return {
        ...state,
        favorite: [action.payload]
      };
    case "UPLOAD":
      return {
        ...state,
        imageData: [action.payload[0], ...state.imageData]
      };
    default:
      throw Error("Action name not defined");
  }
};

export default FeedReducer;

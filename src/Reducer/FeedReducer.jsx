const FeedReducer = (state, action) => {

  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        imageData: action.payload.hits
      };
    case "UPLOAD":
      return {
        ...state,
        imageData: [{ ...action.payload[0], id: Date.now() }, ...state.imageData]
      };
    case "LIKE":
      return {
        ...state,
        imageData: state.imageData.map(e => e.id === action.payload.id ? action.payload : e)
      };
    case "ADD_FAVORITES":
      return {
        ...state,
        favorite: [action.payload, ...state.favorite] //assigning after updated
      };
    case "ADD_COMMENTS":
      return {
        ...state,
        comments: [action.payload, ...state.comments] //only one comment added
      };
    default:
      throw Error("Action name not defined");
  }
};

export default FeedReducer;

import React from "react";

const Context = React.createContext();

const Postreducer = (state, action) => {

  console.log("Post COntents action.payload is ", action.payload);
  
  switch (action.type) {
    case "UPLOAD":
      return {
        ...state,
        files: [action.payload, ...state.files]
      };
    default:
      return state;
  }
};

export class PostProvider extends React.Component {
  state = {
    files: [], //new post

    dispatch: (action) => {
      this.setState((state) => Postreducer(state, action));
    }
  };

  render() {
    return (
      <>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export const Consumer = Context.Consumer;
export default Consumer;

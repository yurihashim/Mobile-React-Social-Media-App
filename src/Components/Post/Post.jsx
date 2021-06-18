import React, { Component } from "react";
//import axios from "axios"; 
import { Consumer } from "../../Contexts/PostContext";
//for routing
import { withRouter } from 'react-router-dom';

class Post extends Component {
  state = {
    user: "",
    img: "",
    tags: ""
  };

  onChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (dispatch, e) => {
    console.log(dispatch);
    e.preventDefault();
    const { user, img, tags } = this.state;
    const newPost = {
      user,
      img,
      tags
    };
    dispatch({ type: "UPLOAD", payload: newPost });
    //Go back to feed page
    this.props.history.push({
      pathname: '/feed',
      state: { state: this.state }
    });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          const { user, img, tags } = this.state;

          return (
            <>
              <h1> POST</h1>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <label>User: </label>
                <input
                  type="text"
                  value={user}
                  name="user"
                  placeholder="Enter your name"
                  onChange={this.onChange}
                />

                <br />
                <br />

                <label>Image</label>
                <input
                  type="file"
                  value={img}
                  name="img"
                  placeholder="Choose your file"
                  onChange={this.onChange}
                />

                <br />
                <br />

                <label>Tag: </label>
                <input
                  type="text"
                  value={tags}
                  name="tags"
                  placeholder="Enter tag"
                  onChange={this.onChange}
                />

                <input
                  type="submit"
                  value="submit"
                />

                <br />
                <br />

              </form>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default Post;
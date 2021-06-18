import React, { Component } from "react";
//import axios from "axios"; 
import { Consumer } from "../../Contexts/PostContext";

class Post extends Component {
  state = {
    user: "",
    userImageURL: "", 
    previewURL: "",
    largeImageURL: "", 
    favorites: 0,
    likes: 0, 
    comments: 0,
    tags: ""
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (dispatch, e) => {
    console.log(dispatch);
    e.preventDefault();
    const { user, previewURL, largeImageURL,tags } = this.state;
    const newPost = {
      user,
      previewURL,
      largeImageURL,
      tags
    };
    dispatch({ type: "UPLOAD", payload: newPost });
    this.props.history.push({pathname:'/feed'})
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          console.log(value); //新しいPostのデータがあり value.files[0]
          const { dispatch } = value;
          const { user, previewURL, tags } = this.state;
          return (
            <>
              <h1> POST</h1>
              <form 
                onSubmit={
                  this.onSubmit.bind(this, dispatch)}
              >
                <label>Name: </label>
                <input
                  type="text"
                  value={user}
                  name="user"
                  placeholder="Enter your username"

                  onChange={this.onChange}
                />

                <br />
                <br />

                <label>Image</label>
                <input
                  type="file"
                  value={previewURL}
                  name="previewURL"
                  placeholder="Choose a image"
                  onChange={this.onChange}
                />

                <br />
                <br />

                <label>: </label>
                <input
                  type="text"
                  value={tags}
                  name="tags"
                  placeholder="Add tags"
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

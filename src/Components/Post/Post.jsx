import React, { Component } from "react";
//import axios from "axios"; 
import { Consumer } from "../../Contexts/PostContext";

class Post extends Component {
  ////////////////// state name change
  state = {
    user: "",
    previewURL: "",
    largeImageURL: "",
    tags: "",
    likes: 0,
    comments: 0,
    favorites: 0,
    userImageURL: ""
  };

  ////////////////// state name change
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
    ////////////////// state name change
    const { user, previewURL, largeImageURL, tags } = this.state;
    console.log(previewURL);
    console.log(e.target.elements[1].files[0].name);

    const formData = new FormData();
    formData.append('file', e.target.elements[1].files[0].name);
    let formatedFilePath = formData.get("file")
    console.log("formated file", formData.get("file"));

    const newPost = {
      user,
      previewURL: formData.get("file"),
      largeImageURL: formData.get("file"),
      tags
    };
    ////////////////// state name change

    console.log(newPost);
    dispatch({ type: "UPLOAD", payload: newPost });
    //Go back to feed page
    this.props.history.push({
      pathname: '/feed',
    });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          ////////////////// state name change
          const { user, previewURL, largeImageURL, tags } = this.state;

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
                  ////////////////// state name change
                  value={previewURL}
                  name="previewURL"
                  ////////////////// state name change
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
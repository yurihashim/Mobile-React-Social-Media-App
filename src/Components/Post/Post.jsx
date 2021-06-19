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
    userImageURL: "",
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

    const { user, previewURL, largeImageURL, tags } = this.state;

    ////////////////// state name change
    const imageFile = e.target.elements[1].files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    console.log(imageUrl);
    //  this.setState(...this.state, { fileURL: imageUrl });

    const newPost = {
      user,
      previewURL: imageUrl,
      largeImageURL: imageUrl,
      tags,
      likes: 0,
      comments: 0,
      favorites: 0,
    };


    // console.log(imageUrl);
    // console.log(e.target.elements[1].files[0].name);

    // const formData = new FormData();
    // formData.append('file', e.target.elements[1].files[0].name);
    // let formatedFilePath = formData.get("file");
    // console.log("formated file", formData.get("file"));

    // const newPost = {
    //   user,
    //   previewURL: formData.get("file"),
    //   largeImageURL: formData.get("file"),
    //   tags
    // };
    ////////////////// state name change

    console.log(newPost);
    dispatch({ type: "UPLOAD", payload: newPost });
    this.props.history.push({ pathname: '/feed' });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
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
                  placeholder="Enter your name"
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
                  accept="image/*"
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

              <img src={this.fileURL}></img>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default Post;


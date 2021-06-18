import React, { Component } from "react";
//import axios from "axios"; 
import { Consumer } from "../../Contexts/PostContext";

class Post extends Component {
  state = {
    user: "",
    img: "",
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
    const { user, img, tags } = this.state;
    const newPost = {
      user,
      img,
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
          const { user, img, tags } = this.state;
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
                  value={img}
                  name="img"
                  placeholder="Choose a image"
                  onChange={this.onChange}
                />

                <br />
                <br />

                <label>Tag: </label>
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

              {/* Post Result option #1*/}
              {value.files[0] ? (
                //Show result
                <h1>Test</h1>
              ): ""}
            </>
          );
        }}
      </Consumer>
    );
  }
}


export default Post;

import React, { Component } from "react";
import "./Post.css";
import { Consumer } from "../../Contexts/PostContext";
import { Col, Form, Row, Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';
import MediaQuery from 'react-responsive'

class Post extends Component {
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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { user, tags } = this.state;
    const imageFile = e.target.elements[1].files[0];
    const imageUrl = window.URL.createObjectURL(imageFile);

    const newPost = {
      user,
      previewURL: imageUrl,
      largeImageURL: imageUrl,
      tags,
      likes: 0,
      comments: 0,
      favorites: 0
    };

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
             
              <FadeIn>

               <div className = "postContainer">
                <h1> POST</h1>

                <Form className="postForm"
                  onSubmit={this.onSubmit.bind(this, dispatch)}>

                  <Form.Group controlId="formUser">
                    <Form.Label>User Name</Form.Label>
                      <Form.Control className="user"
                        type="text"
                        value={user}
                        name="user"
                        placeholder="Enter your username"
                        onChange={this.onChange}
                      />
                  </Form.Group>

                  <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                      <Form.File
                        type="file"
                        value={previewURL}
                        name="previewURL"
                        placeholder="Choose a image"
                        onChange={this.onChange}
                        accept="image/*"
                      />
                  </Form.Group>

                  <Form.Group controlId="formTag">
                    <Form.Label> Tag </Form.Label>
                      <Form.Control rows={5}
                        type="text"
                        value={tags}
                        name="tags"
                        placeholder="Enter tag"
                        onChange={this.onChange}
                      />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="submit">submit</Button>

                </Form>

               </div>

              </FadeIn>
              
            </>
          );
        }}

      </Consumer>
    );
  }
}

export default Post;


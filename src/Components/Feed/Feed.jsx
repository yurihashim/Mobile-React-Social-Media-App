import React, { useContext, useState, useEffect } from 'react';
import "./Feed.css";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentDots, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FeedContext from "../../Contexts/FeedContext";
import Context from "../../Contexts/PostContext";

const Feed = () => {

  const { images, dispatchImage, submitFlg } = useContext(FeedContext);
  const { files, dispatch } = useContext(Context);

  console.log("images object is ", images);

  console.log("files", files); //files[0] = array of onject

  useEffect(() => {
    {
      files.length !== 0 ? (
        //set "files" into "images" state
        dispatchImage({ type: "UPLOAD", payload: files })
      ) : console.log("First loading. Post not yet added");
    }
  }, []);

  //private state hook for modal pop up
  const [modalStyle, setModalStyle] = useState({ "display": "none" });
  const [targetImage, setTargetImage] = useState({});
  const [comments, setComments] = useState();

  //================== increment/decrement the like count ================== 
  const handleClick = (e, id) => {
    e.stopPropagation(); //prevent modal pop up to open
    e.preventDefault();//prevent modal pop up to open

    //find the target object
    let targetPhoto = images.imageData.find(e => e.id === id);
    console.log(targetPhoto);

    //increment or decriment like/ unlike count
    let updatedImgObj;
    {
      e.target.className === "likes" ?
        updatedImgObj = Object.assign(targetPhoto, { likes: targetPhoto["likes"] + 1 })
        : updatedImgObj = Object.assign(targetPhoto, { comments: targetPhoto["comments"] - 1 });
    }

    // if (e.target.className === "likes") {
    //   updatedImgObj = Object.assign(targetPhoto, { likes: targetPhoto["likes"] + 1 });
    // } else (targetPhoto["likes"] !== 0) {
    //   console.log("can unlike");
    //   updatedImgObj = Object.assign(targetPhoto, { comments: targetPhoto["comments"] - 1 });
    // }

    //update the state
    dispatchImage({ type: "LIKE", payload: updatedImgObj });
  };

  //================== Add photo to favorite ================== 
  const addToFavorite = (e, id) => {
    e.stopPropagation(); //prevent modal pop up to open
    e.preventDefault();//prevent modal pop up to open
    //find the target object
    let targetPhoto = images.imageData.find(e => e.id === id);

    //update the object before dispatching : array of object
    let updatedImgObj = Object.assign(targetPhoto, { favorites: targetPhoto["favorites"] + 1 });

    //update the state
    dispatchImage({ type: "ADD_FAVORITES", payload: updatedImgObj });
  };

  //================== methods for modal ================== 
  const openModal = (e, id) => {
    //find which modal should open
    let clickedImgObj = images.imageData.find(e => e.id === id);
    setTargetImage(clickedImgObj);
    setModalStyle({ "display": "block" });
  };

  const hideModal = () => {
    setModalStyle({ "display": "none" });
  };

  //================== Post comments ================== 
  const postComment = (e) => {
    e.preventDefault();
    dispatchImage({ type: "ADD_COMMENTS", payload: comments });
    setComments("");
  };

  return (
    <>
      {images ? (
        <div className="feedContainer">
          <Row className="imgRow row row-cols-5">
            {images.imageData.map((elem, index) => (
              <>
                <Col>
                  <div className="imagPanel">
                    <img src={elem.previewURL} alt={elem.tags} />
                    {/* show when hovered */}
                    <button className="hoverText" type="button" onClick={e => openModal(e, elem.id)}>
                      <p className="tag"># {elem.tags}</p>
                      <div className="buttons">
                        <span
                          className="likes"
                          onClick={e => handleClick(e, elem.id)}><FaThumbsUp /> {elem.likes}</span>
                        <span
                          className="unlikes"
                          onClick={e => handleClick(e, elem.id)}><FaThumbsDown /> {elem.comments}</span>
                        <span
                          className="favorites"
                          onClick={(e) => { addToFavorite(e, elem.id); }}><FaHeart /> {elem.favorites}</span>
                      </div>
                      <p className="username">{elem.user}</p>
                    </button>
                  </div>
                </Col>
              </>
            ))}
          </Row>

          {/* Modal */}
          {targetImage ? (
            <>
              <div className="modalContainer" style={modalStyle}>
                <button className="clsBtn" onClick={hideModal}><ImCross /></button>
                <Row className="imageModal">
                  <img className="col col-8 largeImg" src={targetImage.largeImageURL} alt="largeImage" />

                  <Col className="col-4 userInfo">
                    <p className="user">
                      <img src={targetImage.userImageURL} alt="userImg" />
                      <div className="right">
                        <p>{targetImage.user}</p>
                        <p className="tag"># {targetImage.tags}</p>
                      </div>
                    </p>

                    <div className="buttons">
                      <span
                        className="likes"
                        onClick={e => handleClick(e, targetImage.id)}><FaThumbsUp /> {targetImage.likes}</span>
                      <span
                        className="unlikes"
                        onClick={e => handleClick(e, targetImage.id)}><FaThumbsDown /> {targetImage.comments}</span>
                      <span
                        className="favorites"
                        onClick={(e) => { addToFavorite(e, targetImage.id); }}><FaHeart /> {targetImage.favorites}</span>
                    </div>

                    {/* Comment input form */}
                    <Card className="commentArea">
                      <Card.Body >
                        <blockquote className="blockquote mb-0">
                          <p className="commentNum"># 1</p>
                          <p>Awesome photo!!</p>
                        </blockquote>
                        {images.comments.map((elem, index) => (
                          <blockquote className="blockquote mb-0">
                            <p className="commentNum"># {index + 2}</p>
                            <p>{elem}</p>
                          </blockquote>
                        ))}
                      </Card.Body>
                    </Card>

                    <Form onSubmit={postComment}>
                      <Form.Group>
                        <Form.Control type="text" placeholder="Add a comment..."
                          onChange={e => { setComments(e.target.value); console.log("adding comments"); }}
                          value={comments}
                        />
                      </Form.Group>
                      <Button type="submit" variant="outline-info" className="postBtn">Post</Button>
                    </Form>

                  </Col>

                </Row>
              </div>
            </>
          ) : ""}
        </div>
      ) : (<h1>Loading...Hang on a sec</h1>)};
    </>
  );
};

export default Feed;

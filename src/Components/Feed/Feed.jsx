import React, { useContext, useState } from 'react';
import "./Feed.css";
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentDots } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FeedContext from "../../Contexts/FeedContext";
import Context from "../../Contexts/PostContext";

const Feed = () => {

  const { images, dispatchImage } = useContext(FeedContext);
  const { files, dispatch } = useContext(Context);
  console.log("images object is ", images);
  console.log("files", files);
  console.log("files", dispatch);

  //private state hook for modal pop up
  const [modalStyle, setModalStyle] = useState({ "display": "none" });
  const [targetImage, setTargetImage] = useState({});

  //================== increment the like count ================== 
  const incrementLike = (e, id) => {
    e.stopPropagation(); //prevent modal pop up to open
    e.preventDefault();//prevent modal pop up to open

    //find the photo obj liked
    let likedImgObj = images.imageData.find(e => e.id === id);
    //increment like count
    let updatedImgObj = Object.assign(likedImgObj, { likes: likedImgObj["likes"] + 1 });
    //update the state
    dispatchImage({ type: "LIKE", payload: updatedImgObj });
  };

  //================== methods for comments ================== 
  const commentClick = (e, id) => {
    console.log("comment", id);
    console.log(e);
  };

  //================== methods for modal ================== 
  const openModal = (e, id) => {
    //open modal
    console.log("modal Clicked", images);
    console.log(e, id);
    //find which modal should open
    let clickedImgObj = images.imageData.find(e => e.id === id);
    console.log(clickedImgObj);
    setTargetImage(clickedImgObj);
    setModalStyle({ "display": "block" });
  };

  const hideModal = () => {
    setModalStyle({ "display": "none" });
  };

  const addToLikes = (e, id) => {
    //find the target object
    let targetObj =
      dispatchImage({ type: "ADD_LIKES", payload: targetImage.id });
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
                        <span onClick={e => incrementLike(e, elem.id)}><FaHeart /> {elem.likes}</span>
                        <span onClick={(e) => { commentClick(e, elem.id); }}><FaCommentDots /> {elem.comments}</span>
                      </div>
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
                      <p>{targetImage.user}</p>
                    </p>
                    <p className="tag"># {targetImage.tags}</p>
                    <button type="button" onClick={() => { dispatchImage({ type: "ADD_LIKES", payload: targetImage }); }}><FaHeart /></button>
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

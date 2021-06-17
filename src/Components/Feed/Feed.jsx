import React, { useContext, useState } from 'react';
import "./Feed.css";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentDots } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FeedContext from "../../Contexts/FeedContext";

const Feed = () => {

  const { images, dispatchImage } = useContext(FeedContext);
  console.log(images);

  //private state hook for modal pop up
  const [modalStyle, setModalStyle] = useState({ "display": "none" });
  const [targetImage, setTargetImage] = useState({});

  const likeClickHandler = (e, id) => {
    console.log("like id is", id);
    console.log(e);
    console.log(images.imageData);
    //find which photo obj is liked
    let likedImgObj = images.imageData.find(e => e.id === id);
    //increment like count
    let updatedImgObj = Object.assign(likedImgObj, { likes: likedImgObj["likes"] + 1 });
    //update the state
    dispatchImage({ type: "LIKE", payload: updatedImgObj });
  };

  const commentClick = (e) => {
    console.log("comment");

  };

  //Modal methods
  const openModal = () => {
    setModalStyle({ "display": "block" });
  };

  const hideModal = () => {
    setModalStyle({ "display": "none" });
  };

  return (
    <>
      {images ? (
        <div className="feedContainer">
          <Row className="imgRow row row-cols-5">
            {images.imageData.map((elem, index) => (
              <>
                <Col key={index}>
                  <div className="imagPanel">
                    <img src={elem.previewURL} alt={elem.tags} />
                    {/* show when hovered */}
                    <button className="hoverText" type="button">
                      <p className="tag">{elem.tags}</p>
                      <div className="buttons">
                        <button onClick={e => likeClickHandler(e, elem.id)}><FaHeart /> {elem.likes}</button>
                        <button onClick={(e) => { commentClick(e); }}><FaCommentDots /> {elem.comments}</button>
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
                <div className="imageModal">
                  <img className="col-8" src={targetImage.largeImageURL} alt="largeImage" />
                  <div className="col-4">
                    <h2>{targetImage.userImageURL} {targetImage.user}</h2>
                    <p>{targetImage.tags}</p>
                  </div>
                </div>
              </div>
            </>
          ) : ""}
        </div>
      ) : (<h1>Loading...Hang on a sec</h1>)};
    </>
  );
};

export default Feed;

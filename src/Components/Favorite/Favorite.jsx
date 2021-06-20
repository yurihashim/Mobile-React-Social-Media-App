import React, { useContext } from 'react';
import "./Favorite.css";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import FeedContext from "../../Contexts/FeedContext";

const Favorite = () => {
  const { images, dispatchImage } = useContext(FeedContext);

  console.log("in likes.jsx", images);

  return (
    <>
      <div className="favoriteContainer">
        <h1>Your Favorite Photo Collection</h1>
        {images.favorite.length !== 0 ? (
          <>
            {images.favorite.map((elem, index) => (
              <>
                {() => {
                  for (let i = 0; i < images.favorite.length; i++) {
                    return (
                      <>
                        <Row>
                          <Col><img src={elem[0].previewURL} alt="likeImg"></img></Col>
                          <Col><img src={elem[1].previewURL} alt="likeImg"></img></Col>
                        </Row>
                        <Row>
                          <Col>1 of 3</Col>
                          <Col>2 of 3</Col>
                          <Col>3 of 3</Col>
                        </Row>
                      </>;
                    )
                  }
                }}

              </>
            ))}
          </>
        ) : (<h2>No collection added yet</h2>)}

      </div>
    </>
  );
};

export default Favorite;

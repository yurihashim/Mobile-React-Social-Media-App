import React, { useContext } from 'react';
import "./Favorite.css";
import { Row, Col } from 'react-bootstrap';
import FeedContext from "../../Contexts/FeedContext";
import FadeIn from 'react-fade-in';

const Favorite = () => {
  const { images } = useContext(FeedContext);

  console.log(images);

  return (
    <>
      <FadeIn>
        <div className="favoriteContainer">
          {images.favorite.length !== 0 ?
            (images.favorite.length > 2 ?
              (
                <>
                  <h2>Your Favorite Photo Collection</h2>
                  <Row className="topFavorite">
                    <Col className="left">
                      <img src={images.favorite[0].largeImageURL} alt="favorite1"></img>
                      <img src={images.favorite[1].largeImageURL} alt="favorite2"></img>
                    </Col>
                    <Col className="right">
                      <img src={images.favorite[2].largeImageURL} alt="favorite3"></img>
                    </Col>
                  </Row>

                  {/* layout change */}
                  {(() => {
                    const html = [];
                    for (let i = 3; i < images.favorite.length; i++) {
                      html.push(
                        <Col className="col-4"><img src={images.favorite[i].largeImageURL} alt="favorite3"></img></Col>
                      );
                    }
                    return <Row className="bottomFavorite">{html}</Row>;
                  })()}
                </>
              ) : (
                (() => {
                  const html = [];
                  for (let i = 0; i < images.favorite.length; i++) {
                    html.push(
                      <Col className="col-4"><img src={images.favorite[i].largeImageURL} alt="favorite3"></img></Col>
                    );
                  }
                  return (<><h2>Your Favorite Photo Collection</h2><Row className="layout2">{html}</Row></>);
                })()
              ))
            : (<h2>No collection added yet :)</h2>)}
        </div>
      </FadeIn>
    </>
  );
};

export default Favorite;

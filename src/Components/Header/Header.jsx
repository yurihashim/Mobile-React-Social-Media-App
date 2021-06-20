import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaSearch, FaHeart, FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import "./Header.css";
import FeedContext from '../../Contexts/FeedContext';

const Header = () => {

  const { keyword, setKeyword, setSubmitFlg } = useContext(FeedContext);
  const [alert, setAlert] = useState("");

  const searchImage = (e) => {
    e.preventDefault();

    //input validation check
    if (e.target[0].value === "") {
      setAlert("Please enter search keyword");
    } else {
      setKeyword(keyword);
      setSubmitFlg(true);
    }
  };

  return (
    <>
      <Navbar fixed="top">
        {/* Header */}
        <header>
          <h1>
            <Link
              to="/home">Ystagram
            </Link>
          </h1>
          <Link
            to="/favorite"
            className="linkItem favorite"><FaHeart /></Link>
          <Link
            to="/post"
            className="linkItem"><FaPhotoVideo /></Link>
          <Link
            to="/login"
            className="linkItem"><FaUserCircle /></Link>
        </header>


        {/* Search Form */}
        <Form className="col-6 searchForm" onSubmit={searchImage}>
          {alert && <p className="alert">{alert}</p>}
          <Form.Group>
            <Form.Control type="text" placeholder="Search..."
              onChange={e => setKeyword(e.target.value)}
              onFocus={() => { setKeyword(""); setAlert(""); }}
              value={keyword} />
          </Form.Group>
          <Button type="submit" className="searchBtn">
            <FaSearch />
          </Button>
        </Form>
      </Navbar>
    </>
  );
};

export default Header;

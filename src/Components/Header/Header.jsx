import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaSearch, FaHeart, FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import "./Header.css";
import FeedContext from '../../Contexts/FeedContext';

const Header = () => {

  const { keyword, setKeyword, setSubmitFlg, alert, setAlert } = useContext(FeedContext);

  const searchImage = (e) => {
    e.preventDefault();

    //input validation check
    if (e.target[0].value === "") {
      setAlert("Please enter search keyword");
      setTimeout(() => { setAlert(""); }, 2000);
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
        <Form className="col searchForm" onSubmit={searchImage}>
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

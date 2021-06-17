import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaSearch, FaHeart, FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import "./Header.css";

const Header = () => {

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
            to="/likes"
            className="linkItem likes"><FaHeart /></Link>
          <Link
            to="/post"
            className="linkItem"><FaPhotoVideo /></Link>
          <Link
            to="/login"
            className="linkItem"><FaUserCircle /></Link>
        </header>

        {/* Search Form */}
        <Form className="col-4 searchForm">
          <Form.Group>
            <Form.Control type="text" placeholder=" Search" />
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

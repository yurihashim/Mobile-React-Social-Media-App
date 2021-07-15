import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Form, Button} from 'react-bootstrap';
import {AiOutlineYoutube, FaRegUserCircle, FaHome, FaSearch, AiOutlineShopping} from "react-icons/all";
import "./BottomNav.css"; 
import FeedContext from '../../Contexts/FeedContext';

const BottomNav = () => {

  const { keyword, setKeyword, setSubmitFlg, alert, setAlert } = useContext(FeedContext);
  const { loginUser } = useContext(FeedContext);
  let history = useHistory();

  const searchImage = (e) => {
    e.preventDefault();

    //input validation check
    if (e.target[0].value === "") {
      setAlert("Please enter search keyword");
      setTimeout(() => { setAlert(""); }, 2000);
    } else {
      setKeyword(keyword);
      setSubmitFlg(true);
      history.push("/home"); //go back to feed
    }
  };

  return (
    <>
      <Navbar fixed="bottom">
        
        <div className="bottomNav">
            <Link
              to="/home"
              className="bottomlinkItem home"><FaHome/></Link>

           {/* Search Form */}
          <Form className="col searchForm" onSubmit={searchImage}>
              {alert && <p className="alert">{alert}</p>}
            <Form.Group>
            <Form.Control type="text"placeholder="Search..."
              onChange={e => setKeyword(e.target.value)}
              onFocus={() => { setKeyword(""); setAlert(""); }}
              value={keyword} />
            </Form.Group>
            <Button type="submit" className="searchBtn">
            <FaSearch />
            </Button>
          </Form>
          
          <Link
            to="/video"
            className="bottomlinkItem"><AiOutlineYoutube /></Link>

          <Link
            to="/shop"
            className="bottomlinkItem"><AiOutlineShopping /></Link>

          <Link
            to="/login"
            className="bottomlinkItem"><FaRegUserCircle /></Link>

          {/* Login user */}
          {(Object.keys(loginUser).length !== 0) && (<p className="loginUser">Welcome! {loginUser.name}</p>)}

        </div>
      </Navbar>
    </>
  );
};

export default BottomNav;

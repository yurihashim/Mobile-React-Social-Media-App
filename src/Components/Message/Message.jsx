import React, { useContext, useState } from 'react';
import "./Message.css";
import { Row, Col, Form, Button } from 'react-bootstrap';
//import FeedContext from "../../Contexts/FeedContext";
import FadeIn from 'react-fade-in';

const Message = () => {

  const [error, setError] = useState("");
  const [user, setMessage] = useState({ name: "", users: "", message: "" });


  const sendMessage = (e) => {
    e.preventDefault();

    //validation check
    if ((user.name === "") || (user.users === "") || (user.message === "")) {
      setError("please enter correctly");
    } else {
      setMessage({ name: "", users: "", message: "" });
    }
  };

  return (
    <>
      <FadeIn>
        <div className="MessageContainer">
          <h2>Send Message</h2>
          {(error !== "") ? (
            <>
              <p className="errorMsg">{error}</p>
            </>
          ) : ""}
          <Form className="MessageForm" onSubmit={sendMessage}>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter your user name"
                onChange={e => setMessage({ ...user, name: e.target.value })}
                value={user.name}
                onFocus={() => { setError(""); setMessage({ name: "", users: "", message: "" }); }} />
            </Form.Group>

            <Form.Group controlId="formGroupuUsers">
              <Form.Label>User:</Form.Label>
              <select>
                  <option> Choose a user from your friends list </option>
                  <option value="Chiharu"> Chiharu</option>
                  <option value="Teresa"> Teresa</option>
                  <option value="Ailish"> Ailish</option>
                  <option value="Cal"> Cal</option>
                  <option value="lily"> Lily</option>
              </select>
            </Form.Group>

            <Form.Group controlId="formGroupMessage">
              <Form.Label>Message:</Form.Label>
              <Form.Control type="text" placeholder="Write messages"
                onChange={e => setMessage({ ...user, message: e.target.value })}
                value={user.message}
                onFocus={() => { setError(""); }} />
            </Form.Group>

            <Button variant="primary" type="submit" className="SebdBtn">Send</Button>
          </Form>
        </div>
      </FadeIn>
    </>
  );
};

export default Message;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./Components/Main/Main";
import Feed from "./Components/Feed/Feed";
import ScrollToTop from "./Components/Router/ScrollToTop";
import {FeedProvider} from "./Contexts/FeedContext"
import Post from "./Components/Post/Post"; 

const App = () => {
  return (
    <>
      <FeedProvider>
        {/* React Router*/}
        <Router>
          {/* Scroll to Top */}
          <ScrollToTop>
            {/* Header */}
            {/* <Header /> */}
            {/* Router Switch */}
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/home" component={Main} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/likes" />
              <Route exact path="/post" component={Post}/>
              <Route exact path="/login" />
            </Switch>
            {/* Footer */}
            {/* <Footer /> */}
          </ScrollToTop>
        </Router>
      </FeedProvider>
    </>
  );
};

export default App;

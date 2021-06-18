import React from 'react';
import "./Main.css";
import Feed from '../Feed/Feed';
import Header from '../Header/Header';

// This is our Parent Component

const Main = () => {
  return (
    <>
      {/* Feed -- default component */}
      <Feed />
    </>
  );
};

export default Main;

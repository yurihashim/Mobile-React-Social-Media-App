import React from 'react';
import "./Main.css";
import Feed from '../Feed/Feed';
import FadeIn from 'react-fade-in';

const Main = () => {
  return (
    <>
      <FadeIn>
        {/* Feed -- default component */}
        <Feed />
      </FadeIn>
    </>
  );
};

export default Main;

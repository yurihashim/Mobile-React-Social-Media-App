import React, { createContext, useEffect, useState, useReducer } from 'react';

//create context
const FeedContext = createContext();

const FeedProvider = (props) => {

  const API = {
    ENDPOINT: "https://pixabay.com/api/",
    API_KEY: "22112901-d9ab6e677acd5ee1c4e0a636d"
  };

  //fetch keyword
  const [param, setParam] = useState("Canada");

  //fetch default feed images
  useEffect(() => {
    try {
      (async (param) => {
        const imgRes = await fetch(`${API.ENDPOINT}?key=${API.API_KEY}&q=${param}&image_type=photo`);
        if (!imgRes.ok) {
          throw imgRes.statusText;
        } else {
          const imgData = await imgRes.json();
          //dispatchImage
        }
      })();
    } catch (error) {
      console.error(`Failed to fetch image data. Error= ${error}`);
    }
  }, []);

  return (
    <>
      <FeedContext.Provider value={{
        param,
        setParam
      }}>
        {props.children}
      </FeedContext.Provider>

    </>
  );
};

export { FeedContext as default, FeedProvider };

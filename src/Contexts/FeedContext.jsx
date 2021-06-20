import React, { createContext, useEffect, useState, useReducer } from 'react';
import FeedReducer from '../Reducer/FeedReducer';

//create context
const FeedContext = createContext();

const FeedProvider = (props) => {

  //global state
  const [keyword, setKeyword] = useState("Canada");
  const [submitFlg, setSubmitFlg] = useState(true);

  const API = {
    ENDPOINT: "https://pixabay.com/api/",
    API_KEY: "22112901-d9ab6e677acd5ee1c4e0a636d"
  };

  //initial state for the reducer
  const initialState = {
    imageData: [],
    favorite: [],
    comments: []
  };

  //Reducer
  const [images, dispatchImage] = useReducer(FeedReducer, initialState);

  //fetch default feed images
  useEffect(() => {
    try {
      {
        submitFlg ? (
          (async () => {
            const imgRes = await fetch(`${API.ENDPOINT}?key=${API.API_KEY}&q=${keyword}&image_type=photo&pretty=true`);
            if (!imgRes.ok) {
              throw imgRes.statusText;
            } else {
              const imgData = await imgRes.json();
              console.log(imgData);

              dispatchImage({ type: "FETCH_SUCCESS", payload: imgData });
              setSubmitFlg(false);
            }
          })()
        ) : (console.log("search keyword not added yet"));
      }

    } catch (error) {
      console.error(`Failed to fetch image data. Error= ${error}`);
    }
  }, [keyword, submitFlg]);

  return (
    <>
      <FeedContext.Provider value={{
        keyword,
        setKeyword,
        images,
        dispatchImage,
        submitFlg,
        setSubmitFlg
      }}>
        {props.children}
      </FeedContext.Provider>
    </>
  );
};

export { FeedContext as default, FeedProvider };

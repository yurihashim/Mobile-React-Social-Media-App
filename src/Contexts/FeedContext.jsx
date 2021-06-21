import React, { createContext, useEffect, useState, useReducer } from 'react';
import FeedReducer from '../Reducer/FeedReducer';
import UserReducer from '../Reducer/UserReducer';

//create context
const FeedContext = createContext();

const FeedProvider = (props) => {

  //global state
  const [keyword, setKeyword] = useState("Travel");
  const [submitFlg, setSubmitFlg] = useState(true);
  const [alert, setAlert] = useState("");

  const API = {
    ENDPOINT: "https://pixabay.com/api/",
    API_KEY: "22112901-d9ab6e677acd5ee1c4e0a636d"
  };

  //Reducer (*** initialState is ignored. third arguments prioritized)
  //#1 FeedReducer
  const [images, dispatchImage] = useReducer(FeedReducer, [], () => {
    const localFavoriteData = localStorage.getItem("favorite");
    const localCommentsData = localStorage.getItem("comments");
    return {
      imageData: [],
      favorite: localFavoriteData ? JSON.parse(localFavoriteData) : [],
      comments: localCommentsData ? JSON.parse(localCommentsData) : [],
    };
  });

  //#2 UserReducer
  const [loginUser, dispatchUser] = useReducer(UserReducer, {}, () => {
    const localUserData = localStorage.getItem("loginUser");
    return localUserData ? JSON.parse(localUserData) : {};
  });

  //fetch default feed images
  useEffect(() => {
    try {
      {
        submitFlg && (
          (async () => {
            const imgRes = await fetch(`${API.ENDPOINT}?key=${API.API_KEY}&q=${keyword}&image_type=photo&pretty=true`);
            if (!imgRes.ok) {
              throw imgRes.statusText;
            } else {
              const imgData = await imgRes.json();
              dispatchImage({ type: "FETCH_SUCCESS", payload: imgData });
              setSubmitFlg(false);
            }
          })()
        );
      }
    } catch (error) {
      console.error(`Failed to fetch image data. Error= ${error}`);
    }
  }, [keyword, submitFlg]);

  //Add favorite item into LocalStorage
  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(images.favorite));
  }, [images.favorite]);

  //Add comments into LocalStorage
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(images.comments));
  }, [images.comments]);

  //Add login user into LocalStorage
  useEffect(() => {
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
  }, [loginUser]);

  return (
    <>
      <FeedContext.Provider value={{
        keyword,
        setKeyword,
        images,
        dispatchImage,
        submitFlg,
        setSubmitFlg,
        alert,
        setAlert,
        loginUser,
        dispatchUser
      }}>
        {props.children}
      </FeedContext.Provider>
    </>
  );
};

export { FeedContext as default, FeedProvider };

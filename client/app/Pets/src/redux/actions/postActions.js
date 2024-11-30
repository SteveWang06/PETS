import { ApiPaths } from "../../services/ApiPaths";
import { addLike, removeLike } from "../../services/requester/UserRequester";
import {
  UPDATE_POST_LIKE,
  SET_POSTS,
  ADD_LIKE,
  REMOVE_LIKE,
  LIKE_STATUS,
} from "../types";
import { useDispatch, useSelector } from "react-redux";



export const updatePostLike = (postId, isLiked, userToken) => (dispatch) => {
  if (isLiked) {
    addLike(postId, userToken)
      .then(() => {
        dispatch({
          type: ADD_LIKE,
          payload: { postId },
        });
      })
      .catch((error) => console.error("Error adding like:", error));
  } else {
    removeLike(postId, userToken)
      .then(() => {
        dispatch({
          type: REMOVE_LIKE,
          payload: { postId },
        });
      })
      .catch((error) => console.error("Error removing like:", error));
  }
};

export const likeStatus = (likeStatus) => {
  return {
    type: LIKE_STATUS,
    payload: likeStatus
  }
}


export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts, 
  };
};



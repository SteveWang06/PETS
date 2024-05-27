import { ApiPaths } from "../../services/ApiPaths";
import { addLike, removeLike } from "../../services/requester/UserRequester";
import { UPDATE_POST_LIKE } from "../types";


export const updatePostLike = (id, liked, token) => {
  
  console.log("liked in updatePostLike", liked);
  console.log("id in updatePostLike", id);
  if (liked) {
    addLike(id, token);
  } else {
    removeLike(id, token);
  }
  
  return {
    type: UPDATE_POST_LIKE,
    //payload: liked
    payload: { id, liked }
  }
};


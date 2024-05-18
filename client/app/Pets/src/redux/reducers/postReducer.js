import { UPDATE_POST_LIKE } from "../types";

const initialState = {
  posts: {}
};



const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST_LIKE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload.liked 
        }
      };
    default:
      return state;
  }
};


export default postReducer;

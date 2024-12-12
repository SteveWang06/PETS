import {
  UPDATE_POST_LIKE,
  SET_POSTS,
  ADD_LIKE,
  REMOVE_LIKE,
  LIKE_STATUS,
} from "../types";

const initialState = {
  posts: [],
  likeStatus: false
};



const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, like: post.like + 1, liked: true }
            : post
        ),
      };
    case REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, like: post.like - 1, liked: false }
            : post
        ),
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LIKE_STATUS:
      return {
        ...state,
        likeStatus: action.payload,
      };
    
    default:
      return state;
  }
};


export default postReducer;

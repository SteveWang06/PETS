import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    isAuthenticated: false,
  };
  
  const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case REGISTER_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload, isAuthenticated: true };
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default registerReducer;
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GET_USER_SUCCESS,
  UPDATE_PROFILE,
  REGISTER_SUCCESS,
  VERIFY_OTP_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  userToken: null,
  error: null,
  isAuthenticated: false,
  userData: null,
  profileData: null,
  isRegistered: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userToken: action.payload,
        error: null,
        isAuthenticated: true,
        userData: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isRegistered: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileData: action.payload, // Assuming payload from GET_USER_SUCCESS contains user data
        error: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profileData: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;

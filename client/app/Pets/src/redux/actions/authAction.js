import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";
import { ApiPaths } from "../../services/ApiPaths";

export const loginRequest = ({email, password}) => {
    console.log('Dispatching login request action with email:', email, 'and password:', password);
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
    
        try {
          const response = await fetch(ApiPaths.loginApi, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

    
          if (!response.ok) {
            throw new Error('Email or password is incorrect');
          }
    
          const data = await response.json();
          dispatch({ type: LOGIN_SUCCESS, payload: data });
          //console.log("user data in loginRequest: ", data);
        } catch (error) {
          dispatch({ type: LOGIN_FAILURE, payload: error.message });
          throw error;
        }
      };
};

export const loginSuccess = (userData) => {
    
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = () => ({
    type: LOGOUT,
  });
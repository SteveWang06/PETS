import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";
import { ApiPaths } from "../../services/ApiPaths";


export const loginRequest = ({ email, password }) => {
  
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await fetch(ApiPaths.loginApi, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Email or password is incorrect");
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

export const registerRequest = ({ username, email, password }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user")
      //formData.append("image", "")

      const response = await fetch(ApiPaths.userRegister, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Email already exit");
      }

      const data = await response.json();
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      //console.log("user data in loginRequest: ", data);
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
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

export const registerSuccess = (userData) => {
  return {
    type: REGISTER_SUCCESS,
    payload: userData,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

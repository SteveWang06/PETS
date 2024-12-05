import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_USER_SUCCESS, UPDATE_PROFILE } from "../types";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";
import { ApiPaths } from "../../services/ApiPaths";
import { getUserByIdFromDatabase } from "../../services/requester/UserRequester";
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

      const profileData = await getUserByIdFromDatabase(data.userId, data.token);
      dispatch({ type: GET_USER_SUCCESS, payload: profileData });
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
      formData.append("role", "user");

      const response = await fetch(ApiPaths.userRegister, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Cần khai báo
        },
      });

      if (!response.ok) {
        throw new Error("Email already exists");
      }

      const data = await response.json();
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      return { success: true, message: data.message };
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
      throw error;
    }
  };
};
export const getUserById = ({userId, userToken}) => {
  
  return async (dispatch) => {
    try {
     
      const profileData = await getUserByIdFromDatabase(userId, userToken);
      dispatch({ type: GET_USER_SUCCESS, payload: profileData });
      return profileData;
      //console.log("profileData: ", profileData);
    } catch (error) {
      console.error("Error fetching user data:", error);
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

export const updateProfile = (updatedProfileData) => ({
  type: UPDATE_PROFILE,
  payload: updatedProfileData,
});
import axios from "axios";
import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../types";
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR } from "../types";

export const fetchProducts = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8080/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error.message });
  }
};

export const addProduct = (userId, token, productData) => async (dispatch) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("type", productData.type);
    formData.append("price", productData.price);
    
    productData.images.forEach((uri, index) => {
        formData.append(`images`, {
          uri: uri,
          name: `image${index}.jpeg`,
          type: "image/jpeg",
        });
      });
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_PRODUCT_ERROR, payload: error.message });
    }
  };

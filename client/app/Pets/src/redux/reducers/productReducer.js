import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../types";
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR, UPDATE_PROFILE } from '../types';


const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false }; // You may update state as needed after successfully adding a product
    case ADD_PRODUCT_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default productReducer;

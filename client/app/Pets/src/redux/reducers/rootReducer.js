import { combineReducers } from "redux";
import postReducer from "./postReducer";
import { persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import productReducer from "./productReducer";



const persistConfig = {
    key: "root",
    storage
}




const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  post: persistReducer(persistConfig, postReducer),
  register: registerReducer,
  products: persistReducer(persistConfig, productReducer),
});

export default rootReducer;

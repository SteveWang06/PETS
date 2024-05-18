import { combineReducers } from "redux";
import postReducer from "./postReducer";
import { persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'
import authReducer from "./authReducer";

const persistConfig = {
    key: "root",
    storage
}




const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  post: persistReducer(persistConfig, postReducer)
});

export default rootReducer;

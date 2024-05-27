import { combineReducers } from "redux";
import postReducer from "./postReducer";
import { persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";




const persistConfig = {
    key: "root",
    storage
}




const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  post: persistReducer(persistConfig, postReducer),
  register: registerReducer
});

export default rootReducer;

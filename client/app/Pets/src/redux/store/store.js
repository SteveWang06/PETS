import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { thunk } from "redux-thunk";
import storage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import authMiddleware from "../middleware/authMiddleware";

const persistConfig = {
    key: "root",
    storage,
    
}
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export const persistor = persistStore(store)


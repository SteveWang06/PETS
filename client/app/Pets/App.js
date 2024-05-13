import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import "./src/constants/config";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/redux/store/store"
export default function App() {
  return (
    <Provider store={store}>

      <AppNav />
      {/* <AuthProvider>
        <AppNav />
      </AuthProvider> */}
    </Provider>
    
  );
}



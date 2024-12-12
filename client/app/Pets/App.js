import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import "./src/constants/config";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/redux/store/store"
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MapModal } from "./src/components/MapModal";


const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>

      <AppNav />
      {/* <AuthProvider>
        <AppNav />
      </AuthProvider> */}
    </Provider>
    </QueryClientProvider>
   );
}



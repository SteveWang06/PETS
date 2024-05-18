import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";

import HomeScreen from "../screens/HomeScreen";
import { useSelector } from 'react-redux';

const AppNav = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return (
    <NavigationContainer>
      {/* {userToken !== null ? <HomeScreen /> : <LoginScreen />}   */}
      {isAuthenticated ? <HomeScreen /> : <LoginScreen />}  
    </NavigationContainer>
  );
};

export default AppNav;

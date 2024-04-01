import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);


    if( isLoading ) {

        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
        
    }



  return (
    <NavigationContainer>
        {userToken !== null ? <HomeScreen/> : <LoginScreen/>}
    </NavigationContainer>
  )
}

export default AppNav
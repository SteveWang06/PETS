import React from "react";
import AddNewPostPage from "../page/AddNewPostPage";
import HomePage from "../page/HomePage";
import ShopPage from "../page/ShopPage";
import ProfilePage from "../page/ProfilePage";
import HospitalPage from "../page/HospitalPage";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator 
      activeColor="#f0edf6"
      inactiveColor="#FAE009"
      barStyle={{ backgroundColor: '#8B0000' }}>
      <Tab.Screen
        name='home'
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <MaterialCommunityIcons name='home' size={24} />,
        }}
      />
      <Tab.Screen
        name='friend'
        component={AddNewPostPage}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: () => (
            <MaterialCommunityIcons name='account-multiple' size={24} />
          ),
        }}
      />

      <Tab.Screen
        name='shop'
        component={ShopPage}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: () => (
            <MaterialCommunityIcons name='shopping' size={24} />
          ),
        }}
      />

      <Tab.Screen
        name='hospital'
        component={HospitalPage}
        options={{
          tabBarLabel: "Hospital",
          tabBarIcon: () => (
            <MaterialCommunityIcons name='hospital-building' size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='profile'
        component={ProfilePage}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <MaterialCommunityIcons name='face-man' size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

import React, { useState } from "react";
import AddNewPostPage from "../page/AddNewPostPage";
import HomePage from "../page/HomePage";
import ShopPage from "../page/ShopPage";
import ProfilePage from "../page/ProfilePage";
import HospitalPage from "../page/HospitalPage";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from 'react-i18next';
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator 
      activeColor="#f0edf6"
      inactiveColor="#FAE009"
      barStyle={{ backgroundColor: '#8B0000' }}>
      <Tab.Screen
        name='home'
        component={HomePage}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: () => <MaterialCommunityIcons name='home' size={24} />,
        }}
      />
      <Tab.Screen
        name='friend'
        component={AddNewPostPage}
        options={{
          tabBarLabel: t('friends'),
          tabBarIcon: () => (
            <MaterialCommunityIcons name='account-multiple' size={24} />
          ),
        }}
      />

      <Tab.Screen
        name='shop'
        component={ShopPage}
        options={{
          tabBarLabel: t('shop'),
          tabBarIcon: () => (
            <MaterialCommunityIcons name='shopping' size={24} />
          ),
        }}
      />

      <Tab.Screen
        name='hospital'
        component={HospitalPage}
        options={{
          tabBarLabel: t('hospital'),
          tabBarIcon: () => (
            <MaterialCommunityIcons name='hospital-building' size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='profile'
        component={ProfilePage}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: () => (
            <MaterialCommunityIcons name='face-man' size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "../components/Logo";
import { theme } from "../core/theme";

export default function Header(props) {
  return (
    <View style={styles.container}>
      
      
      <View style={styles.rectangle}></View>
      <View style={styles.logo}>
        <Logo/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.red, 
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },

  logo: {
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 20
  }

});

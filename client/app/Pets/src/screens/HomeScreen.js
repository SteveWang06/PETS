import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Button } from "react-native-paper";


const HomeScreen = () => {

    const {logout} = useContext(AuthContext);
  return (
    <View>
      <Button style={styles.button} onPress={() => {logout()}}>
        <Text style={styles.text}>logout</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    
  
    button: {
      backgroundColor: "blue",
      width: "50%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 100
    },
    text: {
        color: "#FFFFFF",
      },
  });

export default HomeScreen
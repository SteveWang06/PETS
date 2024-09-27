import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFound = () => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your own image URL
        style={styles.image}
      />
      <Text style={styles.text}>Oops! Page not found.</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  
});

export default NotFound;

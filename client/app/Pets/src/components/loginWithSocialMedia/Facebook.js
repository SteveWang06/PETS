import { StyleSheet, Image } from 'react-native'
import React from 'react'


const Facebook = () => {
  return (
    <Image source={require('../../assets/Facebook-logo.png')} style={styles.image}/>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});

export default Facebook
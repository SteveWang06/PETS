import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Loader = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedWidth, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedWidth]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "110%"],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderBackground}>
        <Animated.View
          style={[
            styles.loaderBar,
            {
              width: widthInterpolation,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loaderBackground: {
    width: 120,
    height: 20,
    borderRadius: 20,
    backgroundColor: "lightblue",
    overflow: "hidden",
  },
  loaderBar: {
    height: "100%",
    backgroundColor: "orange",
    borderRadius: 20,
  },
});

export default Loader;

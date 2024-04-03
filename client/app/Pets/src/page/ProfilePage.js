import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-native-paper";
import SearchComponent from "../components/Search";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <View style={styles.search}>
        <SearchComponent />
        <TouchableOpacity style={styles.iconAddPost} onPress>
          <AntDesign name='pluscircleo' size={24} color='black' />
        </TouchableOpacity>
      </View>
      <Button
        style={styles.button}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.text}> logout </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    marginTop: 50,
  },
  iconAddPost: {
    alignItems: "center",
    position: "absolute",
    right: 20,
    marginTop: 18,
  },
  button: {
    backgroundColor: "blue",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 100,
  },
  text: {
    color: "#FFFFFF",
  },
});

export default ProfilePage;

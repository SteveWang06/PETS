import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Pressable
} from "react-native";
import React, { useState } from "react";
import SearchBar from "./Search";
import { AntDesign } from "@expo/vector-icons";
import AddNewPost from "./AddNewPost";
import HomePage from "../page/HomePage";

const HomepageHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>PET</Text>
      </View>

      <View style={styles.search}>
        <SearchBar />
        <Pressable style={styles.iconAddPost} onPress={() => setModalVisible(true)}>
          
          <AntDesign name='pluscircleo' size={24} color='black' />
        </Pressable>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddNewPost/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "15%",
    width: "100%",
    backgroundColor: "#fff",
  },
  rectangle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#8B0000",
  },

  search: {
    marginTop: 40,
  },
  iconAddPost: {
    alignItems: "center",
    position: "absolute",
    right: 20,
    marginTop: 18,
  },
  text: {
    marginTop: 60,
    marginLeft: 50,
    fontSize: 20,
    color: "white",
    fontFamily: "Helvetica",
  },
  modalContainer: {
    marginTop: 200
  }
});
export default HomepageHeader;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import SearchBar from "./Search";
import { AntDesign } from "@expo/vector-icons";
import AddNewPost from "./AddNewPost";
import HomePage from "../page/HomePage";

const HomepageHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>PET</Text>
      </View>

      <View style={styles.search}>
        <SearchBar />
        <TouchableOpacity style={styles.iconAddPost} onPress={openModal}>
          <AntDesign name='pluscircleo' size={24} color='black' />
        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <AddNewPost />
              <Button title='Đóng' onPress={closeModal} />
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
    marginTop: 100
  }
});
export default HomepageHeader;

import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import SearchBar from "./Search";
import { AntDesign } from "@expo/vector-icons";
import AddNewPost from "./AddNewPost";
import { getUserNameAndAvatarFromAsyncStorage } from "../services/requester/UserRequester";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
const HomepageHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.userId;
  const userToken = userData.token;
  const userName = userData.userName;
  //const userAvatar = userData.avatar.imageUrl;
  const userAvatar = userData?.avatar?.imageUrl;
  const handlePress = async () => {
    // const userInfo = await getUserNameAndAvatarFromAsyncStorage();
    // if (userInfo) {
    //   //setUserInfo(userInfo);
    //   setModalVisible(true);
    // }
    setModalVisible(true);
  };

  const handleModalVisibility = (visibility) => {
    setModalVisible(visibility);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>PET</Text>
      </View>

      <View style={styles.search}>
        <SearchBar />
        <Pressable style={styles.iconAddPost} onPress={handlePress}>
          <AntDesign name='pluscircleo' size={24} color='black' />
        </Pressable>
        <View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AddNewPost
                  setModalVisible={handleModalVisibility}
                  authorName={userName}
                  avatar={userAvatar}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "15%",
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 35,
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
    marginTop: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default HomepageHeader;

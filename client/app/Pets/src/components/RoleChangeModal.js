import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { handleRequestChangeRole } from "../services/requester/UserRequester";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../core/theme";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const RoleChangeModal = ({ showRoleModal, setShowRoleModal, currentRole }) => {
  const [requestedRole, setRequestedRole] = useState("BUSINESS");
  const [address, setAddress] = useState(""); // State để lưu trữ địa chỉ nhập vào

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.userId;
  const userToken = userData.token;
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleRoleChange = (role) => {
    setRequestedRole(role);
  };

  const handleRequest = async () => {
    // Gửi yêu cầu lên server với userId, requestedRole, và address
    handleRequestChangeRole(userId, userToken, requestedRole, address, images);
    handleModalVisibility
  
    setShowRoleModal(false);
    // setTimeout(() => {
    //   setShowRoleModal(false);
    // }, 2000);
  };

  const handleModalVisibility = () => {
    images.forEach((uri) => deleteImage(uri));
    setImages([]);
    setModalVisible(false);
  };

    const deleteImage = async (uri) => {
      await FileSystem.deleteAsync(uri);
      setImages(images.filter((i) => i !== uri));
    };
  //Load images on startup
  useEffect(() => {
    loadImages();
  }, []);

  //Load images from file system
  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  const choosePhotosFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "You need to grant permission to access the photo library"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const newUris = [];
        const uris = result.assets || result.images || result.selected || [];
        uris.forEach(async (asset) => {
          newUris.push(asset.uri);
        });
        setImages([...images, ...newUris]);
        console.log("images: ", newUris);
        
      }
    } catch (error) {
      console.error("Error selecting multiple images:", error);
    }
  };

  const buttons = [t("camera"), t("photoLibrary"), t("cancel")];
  const actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  const renderItem = ({ item }) => {
    const filename = item.split("/").pop();
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ImageBackground
          style={{ width: 90, height: 90 }}
          source={{ uri: item }}>
          <AntDesign.Button
            name='close'
            onPress={() => deleteImage(item)}
            backgroundColor='transparent'
            color='white'
            size={15}
            iconStyle={styles.iconStyle}
          />
        </ImageBackground>
      </View>
    );
  };

  return (
    <Modal
      visible={showRoleModal}
      animationType='slide'
      transparent={true}
      onRequestClose={() => setShowRoleModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Your current role is: {currentRole}
          </Text>
          <Text style={styles.modalText}>Choose a new role:</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "BUSINESS" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("BUSINESS")}>
              <Text style={styles.buttonText}>BUSINESS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "HOSPITAL" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("HOSPITAL")}>
              <Text style={styles.buttonText}>HOSPITAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "USER" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("USER")}>
              <Text style={styles.buttonText}>USER</Text>
            </TouchableOpacity>
          </View>

          {/* TextInput để nhập địa chỉ */}
          <TextInput
            style={styles.input}
            placeholder='Enter your address'
            value={address}
            onChangeText={setAddress} // Cập nhật state khi người dùng nhập
          />

          {/* nhap anh certificate */}
          <SafeAreaView style={{ height: 300 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                //marginVertical: 20,
              }}>
              <Button title={t("selectImage")} onPress={showActionSheet} />

              <ActionSheet
                ref={actionSheet}
                title={t("chooseImageIn")}
                options={buttons}
                cancelButtonIndex={2}
                onPress={(index) => {
                  switch (index) {
                    case 0:
                      takePhotoFromCamera();
                      break;
                    case 1:
                      choosePhotosFromGallery();
                      break;
                    default:
                      break;
                  }
                }}
              />
            </View>

            <FlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />

            {/* <Button title='Upload Images' onPress={uploadImages} /> */}

            {uploading && (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: "rgba(0,0,0,0.4)",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}>
                <ActivityIndicator color='#fff' animating size='large' />
              </View>
            )}
          </SafeAreaView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roleButton} onPress={handleRequest}>
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, styles.closeButton]}
              onPress={() => setShowRoleModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlashMessage position='top' style={{ marginBottom: 50 }} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  radioButtonSelected: {
    backgroundColor: "#0275d8",
  },
  buttonText: {
    color: theme.colors.black,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleButton: {
    backgroundColor: "#0275d8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#d9534f",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default RoleChangeModal;

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { handleSubmitEditProfile } from "../services/requester/UserRequester";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import ActionSheet from "react-native-actionsheet";
import { useTranslation } from "react-i18next";
import { getUserById } from "../redux/actions/authAction";

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(100), (val, index) => currentYear - index);
const months = Array.from(new Array(12), (val, index) => index + 1);
const days = Array.from(new Array(31), (val, index) => index + 1);

const imgDir = FileSystem.documentDirectory + "images/";
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};


const EditProfileModal = ({
  showModalEditProfile,
  closeModalEditProfile,
  userAvatar,
  userName,
  userEmail,
  userBirthday,
  reload
}) => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [birthdayYear, setBirthdayYear] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [selectedImage, setSelectedImage] = useState(userAvatar);
  const { t } = useTranslation();

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.userId;
  const userToken = userData.token;
  //const dispatch = useDispatch();
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra xem userName và userEmail có giá trị không trước khi cập nhật state
    if (userName && userEmail) {
      setUsername(userName);
      setEmail(userEmail);
    }
  }, [userName, userEmail]); // Thêm userName và userEmail vào dependencies của useEffect

  const handleSubmit = () => {
    handleSubmitEditProfile(
      userId,
      userToken,
      username,
      email,
      address,
      birthdayYear,
      birthdayMonth,
      birthdayDay,
      selectedImage
    );
    dispatch(getUserById({ userId, userToken }));
  };

  useEffect(() => {
    if (userId && userToken) {
      dispatch(getUserById({ userId, userToken }));
    }
  }, [closeModalEditProfile]);


  
  useEffect(() => {
    loadImages();

  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const file = await FileSystem.readDirectoryAsync(imgDir);
    if (file.length > 0) {
      setSelectedImage(file);
    }
  };

  const choosePhotoFromGallery = async () => {
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
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        const newUri = result.assets[0].uri;
        setSelectedImage(newUri);
      }
    } catch (error) {
      console.error("Error selecting an image:", error);
    }
  };

  const buttons = [t("camera"), t("photoLibrary"), t("cancel")];
  const actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  useEffect(() => {
    if (userBirthday && Array.isArray(userBirthday) && userBirthday.length === 3) {
        const [year, month, day] = userBirthday;
        setBirthdayYear(year.toString());
        setBirthdayMonth(month.toString());
        setBirthdayDay(day.toString());
      }
  }, [userBirthday]);

  return (
    <Modal
      visible={showModalEditProfile}
      animationType='slide'
      transparent={true}
      onRequestClose={closeModalEditProfile}>
      <View style={styles.modalEditContainer}>
        <View style={styles.modalEditContent}>
          <View style={styles.headerEdit}>
            <Image
              source={{
                uri: selectedImage ? selectedImage : userAvatar,
              }}
              style={styles.avatarEdit}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={showActionSheet}>
              <FontAwesome name='camera' size={15} color='black' />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Username'
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputEdit}
          />

          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputEdit}
            keyboardType='email-address'
          />
          <TextInput
            placeholder='Address'
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.inputEdit}
          />

          <Text>Your birthday :</Text>

          <View style={styles.birthdayContainer}>
            <RNPickerSelect
              onValueChange={(value) => setBirthdayYear(value)}
              items={years.map((year) => ({
                label: year.toString(),
                value: year,
              }))}
              value={birthdayYear}
              placeholder={{ label: "Year", value: null }}
              style={pickerSelectStyles}
            />

            <RNPickerSelect
              onValueChange={(value) => setBirthdayMonth(value)}
              items={months.map((month) => ({
                label: month.toString(),
                value: month,
              }))}
              value={birthdayMonth}
              placeholder={{ label: "Month", value: null }}
              style={pickerSelectStyles}
            />

            <RNPickerSelect
              onValueChange={(value) => setBirthdayDay(value)}
              items={days.map((day) => ({
                label: day.toString(),
                value: day,
              }))}
              value={birthdayDay}
              placeholder={{ label: "Day", value: null }}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSaveEdit}
              onPress={() => {
                handleSubmit();
                closeModalEditProfile();
              }}>
              <Text>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancelEdit}
              onPress={closeModalEditProfile}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ActionSheet
        ref={actionSheet}
        title={t("chooseImageIn")}
        options={buttons}
        cancelButtonIndex={2}
        onPress={(index) => {
          switch (index) {
            case 0:
              Alert.alert(
                "Not implemented",
                "Camera option is not implemented yet"
              );
              break;
            case 1:
              choosePhotoFromGallery();
              break;
            default:
              break;
          }
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalEditContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalEditContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  headerEdit: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  circleEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  avatarEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  iconButton: {
    //marginLeft: 10,
  },
  inputEdit: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  birthdayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonSelectEditImage: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSaveEdit: {
    padding: 10,
    backgroundColor: "#28A745",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  buttonCancelEdit: {
    padding: 10,
    backgroundColor: "#DC3545",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 45,
    marginBottom: 10,
    width: "100%",
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 45,
    marginBottom: 10,
    width: "100%",
    marginTop: 10,
  },
  placeholder: {
    // Style riêng cho placeholder
    color: "gray",
    fontSize: 15,
  },
});


export default EditProfileModal;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
//import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { handlePost } from "../services/requester/UserRequester";
import { launchImageLibrary } from "react-native-image-picker";

const AddNewPost = ({ setModalVisible }) => {
  const [caption, setCaption] = useState("");
  //const [imageUri, setImageUri] = useState(null);

  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`http://localhost:8080/api/auth/post/`, {
      method: "POST",
      body: createFormData(photo, { userId: "1" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleModalVisibility = () => {
    // Gọi hàm callback để cập nhật giá trị modalVisible trong ParentComponent
    setModalVisible(false); // Hoặc false tùy theo trạng thái mong muốn
  };

  // const handleImagePicker = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (!pickerResult.cancelled) {
  //     // Cập nhật state imageUri với đường dẫn của hình ảnh được chọn
  //     setImageUri(pickerResult.uri);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "http://localhost:8080/api/auth/84c2f3a8-ed99-4809-970d-f9e0ed06d290_dog3.jpeg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.author}>{"authorName"}</Text>
      </View>

      <View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title='Upload Photo' onPress={handleUploadPhoto} />
            </>
          )}
          <Button title='Choose Photo' onPress={handleChoosePhoto} />
        </View>
        {/* <TextInput
          placeholder='Nhập caption...'
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
        />
        {/* {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />} */}
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
        <Button title='Chọn hình ảnh' onPress={handleChoosePhoto} />

        <View style={styles.postCancelButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleModalVisibility}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.postButton,
              { backgroundColor: caption || imageUri ? "#099BFA" : "#8C8383" },
            ]}
            onPress={handleUploadPhoto}
            disabled={!caption}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  input: {
    width: "100%",
    height: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  author: {
    fontSize: 20,
    marginLeft: 10,
  },
  postCancelButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postButton: {
    width: "30%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cancelButton: {
    width: "30%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FA0909",
  },
  text: {
    color: "#FFFF",
  },
});

export default AddNewPost;

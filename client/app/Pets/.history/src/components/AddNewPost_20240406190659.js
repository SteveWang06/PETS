import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AddNewPost = () => {
  const [caption, setCaption] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      // Cập nhật state imageUri với đường dẫn của hình ảnh được chọn
      setImageUri(pickerResult.uri);
    }
  };

  const handlePost = async () => {
    try {
      // Tạo một đối tượng FormData để gửi dữ liệu dưới dạng multipart/form-data
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("caption", caption);

      // Chuyển hình ảnh thành dạng Blob để gửi
      const response = await fetch(imageUri);
      const imageBlob = await response.blob();
      formData.append("image", imageBlob);

      // Gửi yêu cầu POST đến backend
      const result = await axios.post(
        "http://localhost:8080/api/auth/post",
        formData
      );

      // Xử lý kết quả từ backend (nếu cần)
      console.log("Created Post", result.data);
    } catch (error) {
      console.error("Error create post:", error);
    }
  };

  return (
    <View>
      
      
      <View>
        <Image source={{ uri: "http://localhost:8080/api/auth/84c2f3a8-ed99-4809-970d-f9e0ed06d290_dog3.jpeg" }} style={{width: 100, height: 100}} />

        <Text style={styles.author}>{"authorName"}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder='Nhập caption...'
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
        />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <Button title='Chọn hình ảnh' onPress={handleImagePicker} />
        <Button
          title='Đăng bài'
          onPress={handlePost}
          disabled={!caption || !imageUri}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    //marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default AddNewPost;

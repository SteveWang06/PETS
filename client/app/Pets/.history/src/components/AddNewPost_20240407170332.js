import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { handlePost } from "../services/requester/UserRequester";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';

const imgDir = FileSystem.documentDirectory + "images/";
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const AddNewPost = ({ setModalVisible }) => {
  const [caption, setCaption] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  const [imageSelected, setImageSelected] = useState([]);

  const handleModalVisibility = () => {
    setModalVisible(false);
  };
  // Load images on startup
  useEffect(() => {
    loadImages();
  }, []);

  // Load images from file system
  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  // Select image from library or camera
  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    // Save image if not cancelled
    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpeg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
    setImageSelected(true);
  };

  // Upload images to server
  const uploadImages = async () => {
    setUploading(true);

    await Promise.all(
      images.map(async (uri) => {
        await FileSystem.uploadAsync(
          "http://localhost:8080/api/auth/post/",
          uri,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file",
          }
        );
      })
    );

    setUploading(false);
  };

  // Delete image from file system
  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  const renderItem = ({ item }) => {
    const filename = item.split("/").pop();
    return (
      <View 
        style={{
          flexDirection: "row",
          margin: 4,
          alignItems: "center",
          
          
        }}>
        <ImageBackground
          style={{ width: 100, height: 100 }}
          source={{ uri: item }}>
          <AntDesign.Button 
          name='closecircle' 
          onPress={() => deleteImage(item)} 
          backgroundColor='transparent'
          
          color='black'
          size={15}
          iconStyle={ styles.iconStyle }/>
        </ImageBackground>

        {/* <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
        <Ionicons.Button name='trash' onPress={() => deleteImage(item)} /> */}
      </View>
    );
  };

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
        <TextInput
          placeholder='Nhập caption...'
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
        />
        <SafeAreaView style={{ height: 300 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}>
            <Button title='Photo Library' onPress={() => selectImage(true)} />
            <Button title='Capture Image' onPress={() => selectImage(false)} />
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

        <View style={styles.postCancelButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleModalVisibility}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.postButton,
              {
                backgroundColor:
                  caption || images.length > 0 ? "#099BFA" : "#8C8383",
              },
            ]}
            onPress={uploadImages}
            disabled={!caption}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    marginTop: 30,
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
  iconStyle: {
    backgroundColor: '#8C8383', 
    borderRadius: 150, 
    height: 20,
    width: 20,
    textAlign: 'center',
    opacity: 0.5
  }
});

export default AddNewPost;

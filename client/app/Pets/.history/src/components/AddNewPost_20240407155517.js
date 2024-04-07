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
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { handlePost } from "../services/requester/UserRequester";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  const handleModalVisibility = () => {
    
    setModalVisible(true); 
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
          margin: 1,
          alignItems: "center",
          gap: 5,
        }}>
        <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />

        <Ionicons.Button name='trash' onPress={() => deleteImage(item)} />
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
        <SafeAreaView style={{ gap: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}>
            <Button title='Photo Library' onPress={() => selectImage(true)} />
            <Button title='Capture Image' onPress={() => selectImage(false)} />
          </View>

          <FlatList data={images} renderItem={renderItem} />

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
              { backgroundColor: caption || images ? "#099BFA" : "#8C8383" },
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

// const imgDir = FileSystem.documentDirectory + "images/";
// const ensureDirExists = async () => {
//   const dirInfo = await FileSystem.getInfoAsync(imgDir);
//   if (!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
//   }
// };

// const AddNewPost = ({ setModalVisible }) => {
//   const [caption, setCaption] = useState("");
//   const [imageUri, setImageUri] = useState(null);

//   const [uploading, setUploading] = useState(false);
//   const [images, setImages] = useState([]);

//   // Load images on startup
//   useEffect(() => {
//     loadImages();
//   }, []);

//   // Load images from file system
//   const loadImages = async () => {
//     await ensureDirExists();
//     const files = await FileSystem.readDirectoryAsync(imgDir);
//     if (files.length > 0) {
//       setImages(files.map((f) => imgDir + f));
//     }
//   };

//   // Select image from library or camera
//   const selectImage = async (useLibrary) => {
//     let result;
//     const options = {
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.75,
//     };

//     if (useLibrary) {
//       result = await ImagePicker.launchImageLibraryAsync(options);
//     } else {
//       await ImagePicker.requestCameraPermissionsAsync();
//       result = await ImagePicker.launchCameraAsync(options);
//     }

//     // Save image if not cancelled
//     if (!result.canceled) {
//       saveImage(result.assets[0].uri);
//     }
//   };

//   const saveImage = async (uri) => {
//     await ensureDirExists();
//     const filename = new Date().getTime() + ".jpeg";
//     const dest = imgDir + filename;
//     await FileSystem.copyAsync({ from: uri, to: dest });
//     setImages([...images, dest]);
//   };

//   // Upload image to server
//   const uploadImage = async (uri) => {
//     setUploading(true);

//     await FileSystem.uploadAsync("http://localhost:8080/api/auth/post/", uri, {
//       httpMethod: "POST",
//       uploadType: FileSystem.FileSystemUploadType.MULTIPART,
//       fieldName: "file",
//     });

//     setUploading(false);
//   };

//   // Delete image from file system
//   const deleteImage = async (uri) => {
//     await FileSystem.deleteAsync(uri);
//     setImages(images.filter((i) => i !== uri));
//   };

//   const renderItem = ({ item }) => {
//     const filename = item.split("/").pop();
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           margin: 1,
//           alignItems: "center",
//           gap: 5,
//         }}>
//         <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
//         <Text style={{ flex: 1 }}>{filename}</Text>
//         <Ionicons.Button
//           name='cloud-upload'
//           onPress={() => uploadImage(item)}
//         />
//         <Ionicons.Button name='trash' onPress={() => deleteImage(item)} />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, gap: 20 }}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-evenly",
//           marginVertical: 20,
//         }}>
//         <Button title='Photo Library' onPress={() => selectImage(true)} />
//         <Button title='Capture Image' onPress={() => selectImage(false)} />
//       </View>

//       <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>
//         My Images
//       </Text>
//       <FlatList data={images} renderItem={renderItem} />

//       {uploading && (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: "rgba(0,0,0,0.4)",
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           ]}>
//           <ActivityIndicator color='#fff' animating size='large' />
//         </View>
//       )}
//     </SafeAreaView>
//     //   <View style={styles.container}>
//     //     <View style={styles.header}>
//     //       <Image
//     //         source={{
//     //           uri: "http://localhost:8080/api/auth/84c2f3a8-ed99-4809-970d-f9e0ed06d290_dog3.jpeg",
//     //         }}
//     //         style={styles.avatar}
//     //       />

//     //       <Text style={styles.author}>{"authorName"}</Text>
//     //     </View>

//     //     <View>
//     //       <TextInput
//     //         placeholder='Nhập caption...'
//     //         value={caption}
//     //         onChangeText={(text) => setCaption(text)}
//     //         style={styles.input}
//     //       />
//     //       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//     //       <Button title='Chọn hình ảnh' onPress={handleImagePicker} />

//     //       <View style={styles.postCancelButton}>
//     //         <TouchableOpacity
//     //           style={styles.cancelButton}
//     //           onPress={handleModalVisibility}>
//     //           <Text style={styles.text}>Cancel</Text>
//     //         </TouchableOpacity>
//     //         <TouchableOpacity style={[styles.postButton, { backgroundColor: caption || imageUri ? '#099BFA' : '#8C8383' }]}
//     //         onPress={handlePost()} disabled={!caption}>
//     //           <Text style={styles.text}>Post</Text>
//     //         </TouchableOpacity>
//     //       </View>
//     //     </View>
//     //   </View>
//   );
// };

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

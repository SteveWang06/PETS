import React, { useState, useEffect, useRef, memo} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Alert,
  PanResponder,
  Animated,
  Dimensions // Import Dimensions
} from "react-native";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../config";
import { FORMAT_IMG_URL } from "../config";
import ActionSheet from "react-native-actionsheet";
import { handleUpdateProduct } from "../services/requester/UserRequester";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const EditProductModal = ({ visible, onClose, product, token }) => {
  const [id, setId] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(
    product.price ? product.price.toString() : ""
  );
  const imageUrls = product.imageUrl;
  // console.log(product);
  const allImageUrls = imageUrls.map(
    (item) => `${FORMAT_IMG_URL}/${item.imageUrl}`
  );

  const [images, setImages] = useState(allImageUrls);

  const actionSheet = useRef();

  const [pan] = useState(new Animated.ValueXY());

  const { width: screenWidth } = Dimensions.get("window");



  useEffect(() => {
    
    const initialX = screenWidth - 70; 
    const initialY = 750; 

    pan.setValue({ x: initialX, y: initialY });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false } // Options object for Animated.event
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  

  // Cập nhật lại `images` mỗi khi modal được mở
  useEffect(() => {
    if (visible) {
      setImages(allImageUrls);
    }
  }, [visible]);

  const handleSave = async () => {
    try {
      await handleUpdateProduct(token, id, name, type, description, price, images);
      
      onClose(); // Đóng modal sau khi lưu
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteImage = (uri) => {
    const updatedImages = images.filter((image) => image !== uri);
    setImages(updatedImages);
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
        
      }
    } catch (error) {
      console.error("Error selecting multiple images:", error);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "You need to grant permission to access the camera"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([...images, result.uri]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo with camera.");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageWrapper}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: item }}>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => deleteImage(item)}>
            <AntDesign name="close" size={15} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.bodyContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onClose();
            }}>
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Product</Text>

          <Text style={styles.fieldTitle}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.fieldTitle}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.fieldTitle}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Type"
            value={type}
            onChangeText={setType}
            multiline
          />

          <Text style={styles.fieldTitle}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.addImageButton,
              {
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y }
                ]
              }
            ]}
          >
            <TouchableOpacity onPress={showActionSheet}>
              <MaterialIcons
                name="add-photo-alternate"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.imageHeaderContainer}>
            <Text style={styles.fieldTitle}>Images</Text>
          </View>

          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4} // Số lượng cột
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContainer}
          />

          <ActionSheet
            ref={actionSheet}
            title="Select Image"
            options={["Camera", "Photo Library", "Cancel"]}
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: "auto",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 40,
  },
  closeButton: {
    zIndex: 1,
    position: "absolute",
    right: 10,
    padding: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  imageHeaderContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    marginVertical: 10,
  },
  imageWrapper: {
    margin: 5,
    width: "22%", // Đặt chiều rộng dựa trên số cột
    aspectRatio: 1, // Đảm bảo hình vuông
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 2,
  },
  addImageButton: {
    zIndex: 1,
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
  },
  saveButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProductModal;

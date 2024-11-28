import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, SafeAreaView, Button, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useTranslation } from 'react-i18next';
import ActionSheet from 'react-native-actionsheet';
import { AntDesign } from "@expo/vector-icons";

const imgDir = FileSystem.documentDirectory + "images/";
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};


const ModalAddProduct = ({ visible, onClose, onAddProduct }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [newProductData, setNewProductData] = useState({
    name: '',
    description: '',
    images: [],
    type: '',
    price: ''
  });

  const handleInputChange = (key, value) => {
    setNewProductData({ ...newProductData, [key]: value });
  };

  const resetNewProductData = () => {
    setNewProductData({
      name: '',
      description: '',
      images: [],
      type: '',
      price: ''
    });
  };

  const validateProductData = () => {
    const { name, description, images, type, price } = newProductData;
    if (!name || !description || images.length === 0 || !type || !price) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleAddProduct = () => {
    if (!validateProductData()) {
      return;
    }

    onAddProduct(newProductData);
    resetNewProductData();
    onClose();
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  const choosePhotosFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant permission to access the photo library');
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
        const uris = result.assets || result.selected || [];
        uris.forEach(async (asset) => {
          newUris.push(asset.uri);
        });
        setImages([...images, ...newUris]);
        handleInputChange('images', [...newProductData.images, ...newUris]);
      }
    } catch (error) {
      console.error('Error selecting multiple images:', error);
    }
  };

  const buttons = [t('camera'), t('photoLibrary'), t('cancel')];
  const actionSheet = useRef();

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
    handleInputChange('images', newProductData.images.filter((i) => i !== uri));
  };

  const renderItem = ({ item }) => {
    const filename = item.split("/").pop();
    return (
      <View style={{ flexDirection: "row", margin: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageBackground style={{ width: 90, height: 90 }} source={{ uri: item }}>
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
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Product</Text>
        <SafeAreaView style={{ height: 300 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button title={t('selectImage')} onPress={showActionSheet} />
            <ActionSheet
              ref={actionSheet}
              title={t('chooseImageIn')}
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
          <FlatList data={newProductData.images} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} numColumns={3} />
          {uploading && (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" }]}>
              <ActivityIndicator color='#fff' animating size='large' />
            </View>
          )}
        </SafeAreaView>
        <TextInput style={styles.input} placeholder="Name" value={newProductData.name} onChangeText={(text) => handleInputChange('name', text)} />
        <TextInput style={styles.input} placeholder="Description" value={newProductData.description} onChangeText={(text) => handleInputChange('description', text)} />
        <TextInput style={styles.input} placeholder="Type" value={newProductData.type} onChangeText={(text) => handleInputChange('type', text)} />
        <TextInput style={styles.input} placeholder="Price" value={newProductData.price} onChangeText={(text) => handleInputChange('price', text)} keyboardType="numeric" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Post</Text>
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
    marginTop: "auto",
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    marginRight: 0,
  },
});

export default ModalAddProduct;

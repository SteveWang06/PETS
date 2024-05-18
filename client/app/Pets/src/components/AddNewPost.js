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
  ImageBackground,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import { uploadImages, getPostKindFromDataBase } from "../services/requester/UserRequester";
import { BASE_URL } from "../config";
import { Dropdown } from "react-native-element-dropdown";
import ActionSheet from 'react-native-actionsheet';
import { useTranslation } from 'react-i18next';

const imgDir = FileSystem.documentDirectory + "images/";
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const AddNewPost = ({ setModalVisible, authorName, avatar }) => {
  const [caption, setCaption] = useState("");
  const [kind, setKind] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [dataDropdown, setDataDropdown] = useState([]);
  const [imageSelected, setImageSelected] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchPostKind = async () => {
      try {
        const data = await getPostKindFromDataBase(); 
        const formattedData = data.map(item => ({ label: item.kind, kind: item.kind }));
        
        setDataDropdown(formattedData)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostKind();
  }, []);
  
  const [isFocus, setIsFocus] = useState(false);
  //const [value, setValue] = useState(null);
  const renderLabel = () => {
    if (kind || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {t('selectKind')}
        </Text>
      );
    }
    return null;
  };

  const handleModalVisibility = () => {
    images.forEach((uri) => deleteImage(uri));
    setImages([]);
    setModalVisible(false);
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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant permission to access the photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
        multiple: true,
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
      console.error('Error selecting multiple images:', error);
    }
  };

  const buttons = [
    t('camera'),
    t('photoLibrary'),
    t('cancel')];
  const actionSheet = useRef()
  const showActionSheet = () => {
    actionSheet.current.show()
  }

  
  // const saveImage = async (uri) => {
  //   await ensureDirExists();
  //   const filename = new Date().getTime() + ".jpeg";
  //   const dest = imgDir + filename;
  //   await FileSystem.copyAsync({ from: uri, to: dest });
  //   setImages([...images, ...dest]);
  //   setImageSelected(true);
  // };

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `${BASE_URL}/${avatar}`,
          }}
          style={styles.avatar}
        />

        <Text style={styles.author}>{authorName}</Text>
      </View>

      <View>
        <TextInput
          placeholder= {t('inputCaption')}
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
        />

        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataDropdown}
            search
            maxHeight={300}
            labelField='label'
            valueField='kind'
            placeholder={!isFocus ? t('selectKind') : "..."}
            searchPlaceholder={t('search')}
            value={kind}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setKind(item.kind);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name='Safety'
                size={20}
              />
            )}
          />
        </View>

        <SafeAreaView style={{ height: 300 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              //marginVertical: 20,
            }}>
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
            <Text style={styles.text}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.postButton,
              {
                backgroundColor:
                  caption || images.length > 0 ? "#099BFA" : "#8C8383",
              },
            ]}
            onPress={() => {
              uploadImages(caption, images, handleModalVisibility, kind);
            }}
            disabled={images.length <= 0}>
            <Text style={styles.text}>{t('post')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#8C8383",
    borderRadius: 150,
    height: 16,
    width: 18,
    textAlign: "center",
    opacity: 0.7,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddNewPost;

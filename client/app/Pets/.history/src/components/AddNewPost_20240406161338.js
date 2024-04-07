import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddNewPost = () => {

  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      // Cập nhật state imageUri với đường dẫn của hình ảnh được chọn
      setImageUri(pickerResult.uri);
    }
  };


  return (
    <View>
      <View style={styles.container}>
      <TextInput
        placeholder="Nhập caption..."
        value={caption}
        onChangeText={text => setCaption(text)}
        style={styles.input}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Chọn hình ảnh" onPress={handleImagePicker} />
      <Button title="Đăng bài" onPress={handlePost} disabled={!caption || !imageUri} />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AddNewPost
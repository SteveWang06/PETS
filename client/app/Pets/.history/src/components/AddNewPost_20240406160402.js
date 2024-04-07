import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const AddNewPost = () => {

  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState(null);

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
      <Button title="Chọn hình ảnh" onPress />
      <Button title="Đăng bài"  />
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
    zIndex
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AddNewPost
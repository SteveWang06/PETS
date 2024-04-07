import { View, Text } from 'react-native'
import React from 'react'

const AddNewPost = () => {
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

export default AddNewPost
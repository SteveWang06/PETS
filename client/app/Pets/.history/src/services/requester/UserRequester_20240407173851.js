import axios from 'axios';
import { ApiPaths } from '../ApiPaths';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPostsFromDatabase = async () => {
  try {
    const response = await axios.get(ApiPaths.getAllPost);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


const getUserIdFromAsyncStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo !== null) {
      const { userId, userName, token } = JSON.parse(userInfo);
      return { userId: parseInt(userId), userName, token };
    } else {
      console.log('No userId found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error getting userId from AsyncStorage:', error);
    return null;
  }
};


const uploadImages = async (caption, images) => {
  try {
    // Lấy userId từ AsyncStorage
    const userInfo = await getUserIdFromAsyncStorage();
    if (!userInfo) {
      console.log('No user info found in AsyncStorage');
      return;
    }

    const { userId, token } = userInfo;

    // Tạo formData và thêm userId vào đó
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('caption', caption);
    images.forEach((uri, index) => {
      formData.append(`image${index}`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: 'image/jpeg',
      });
    });

    // Gửi yêu cầu POST lên server
    const response = await axios.post(`${BASE_URL}/post`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};


export { getPostsFromDatabase, uploadImages };
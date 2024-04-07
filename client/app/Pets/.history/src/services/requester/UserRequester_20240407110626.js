import axios from 'axios';
import { ApiPaths } from '../ApiPaths';
import { BASE_URL } from '../../config';


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
    const userIdString = await AsyncStorage.getItem('userId');
    if (userIdString !== null) {
      // Chuyển đổi userId từ chuỗi thành số nguyên
      const userId = parseInt(userIdString, 10);
      return userId;
    } else {
      console.log('No userId found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error getting userId from AsyncStorage:', error);
    return null;
  }
};


const handlePost = async (caption, imageUri) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const userId = await getUserIdFromAsyncStorage();
      if (userId !== null) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('caption', caption);
        formData.append('image', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });

        const response = await axios.post(`${BASE_URL}/post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        // Xử lý kết quả từ backend
        console.log('Post submitted successfully:', response.data);
      } else {
        console.log('Failed to get userId from AsyncStorage');
      }
    } else {
      console.log('No token found in AsyncStorage');
    }
  } catch (error) {
    console.error('Error submitting post:', error);
  }
};

export { getPostsFromDatabase, handlePost };
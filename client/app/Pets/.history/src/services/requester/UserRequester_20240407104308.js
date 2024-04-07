import axios from 'axios';
import { ApiPaths } from '../ApiPaths';



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

export { getPostsFromDatabase };
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
      const { userId, userName } = JSON.parse(userInfo);
      return { userId: parseInt(userId), userName };
    } else {
      console.log('No userId found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error getting userId from AsyncStorage:', error);
    return null;
  }
};




export { getPostsFromDatabase, handlePost };
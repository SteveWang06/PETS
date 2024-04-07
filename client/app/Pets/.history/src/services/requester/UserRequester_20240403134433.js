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

export { getPostsFromDatabase };
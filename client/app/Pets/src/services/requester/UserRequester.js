import axios from 'axios';
import { ApiPaths } from '../ApiPaths';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

const getPostsFromDatabase = async () => {
  try {
    const response = await axios.get(ApiPaths.getAllPost);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const getPostsByIdFromDatabase = async (postId) => {
  try {
    const response = await axios.get(`${ApiPaths.getPostById}${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


const getUserIdFromAsyncStorage = async () => {
  try {
    //const userInfo = await AsyncStorage.getItem('userInfo');
    const userData = useSelector(state => state.auth.userData);
    const userId = userData.userId;
    const userToken = userData.token;
    const userName = userData.userName;
    if (userData !== null) {
      // const { userId, userName, token } = JSON.parse(userInfo);
      // return { userId: parseInt(userId), userName, token };
      return { userId: parseInt(userId), userName, userToken };
    } else {
      console.log('No userId found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error getting userId from AsyncStorage:', error);
    return null;
  }
};

const getUserNameAndAvatarFromAsyncStorage = async () => {
  try {
    //const userInfo = await AsyncStorage.getItem('userInfo');

    const userData = useSelector(state => state.auth.userData);
    const userId = userData.userId;
    const userToken = userData.token;
    const userName = userData.userName;
    const userAvatar = userData.userAvatar;
    if (userData === null) {
      console.log('No userId found in AsyncStorage');
      return null;
    } 

    // const { userName, avatar } = JSON.parse(userInfo);
    // const imageUrl = avatar.imageUrl;
    console.log('UserName:', userName);
    console.log('Avatar:', imageUrl);
    return { userName, userAvatar };

  } catch (error) {
    console.error('Error getting userId from AsyncStorage:', error);
    return null;
  }
};


const uploadImages = async (caption, images, callback, kind) => {
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
    formData.append('kind', kind)
    images.forEach((uri, index) => {
      formData.append(`images`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: 'image/jpeg',
      });
    });

    // Gửi yêu cầu POST lên server
    const response = await axios.post(`${BASE_URL}/post/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    showMessage({
      message: 'successfully',
      type: 'success',
      floating: true,
      duration: 500,
      autoHide: true,
      
    });

   
    if (callback) {
      callback();
    }

    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};

const handleUpdatePost = async (postId, caption, images, callback, kind) => {
  try {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('caption', caption);
    images.forEach((uri, index) => {
      formData.append(`images`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: 'image/jpeg',
      });
    });
    formData.append('kind', kind);



    // Gửi yêu cầu cập nhật bài post lên server
    const response = await axios.put(`${ApiPaths.updatePost}${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        
      },
    });
    showMessage({
      message: 'successfully',
      type: 'success',
      floating: true,
      duration: 500,
      autoHide: true,
      
    });

    if (callback) {
      callback();
    }


  } catch (error) {
    console.error('Error updating post:', error);
    Alert.alert('Error', 'An error occurred while updating post');
  }

  
};

const getPostKindFromDataBase = async () => {
  try {
    const response = await axios.get(ApiPaths.getAllPostKind);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

const addLike = async (postId, token) => {
  try {
    // console.log('Like post id:', postId);
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;

    const response = await axios.post(`${ApiPaths.addPostLike}${postId}/like`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    

    console.log('Like added:', response.data);
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

const removeLike = async (postId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;
    const response = await axios.delete(`${ApiPaths.addPostLike}${postId}/like`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Like added:', response.data);
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

const handleAddCommentToPost = async (postId, content) => {
  try {
    const userInfo = await getUserIdFromAsyncStorage();
    const { token, userId } = userInfo;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', content);
    
    const response = await axios.post(`${ApiPaths.addComment}/${postId}/create`, formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    showMessage({
      message: 'successfully',
      type: 'success',
      floating: true,
      duration: 500,
      autoHide: true,
      
    });
  } catch (error) {
    console.error('Error: ', error);
  }

}

const handleDeleteComment = async (commentId) => {
  try {
    const userInfo = await getUserIdFromAsyncStorage();
    const { token } = userInfo;
    console.log("commentId in handleDeleteComment: ", commentId);
    const response = await axios.delete(`${ApiPaths.deleteComment}/${commentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    showMessage({
      message: 'successfully',
      type: 'success',
      floating: true,
      duration: 500,
      autoHide: true,
      
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

const handleEditComment = async (commentId, content) => {
  try {
    const userInfo = await getUserIdFromAsyncStorage();
    const { token } = userInfo;

    const formData = new FormData();
    formData.append('content', content);
    
    const response = await axios.put(`${ApiPaths.editComment}/${commentId}`, formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    showMessage({
      message: 'successfully',
      type: 'success',
      floating: true,
      duration: 500,
      autoHide: true,
      
    });
  } catch (error) {
    console.error('Error: ', error);
  }

}

const getUserByIdFromDatabase = async (userId, token) => {
  try {
    
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { userId, token } = userInfo;
    const response = await axios.get(`${ApiPaths.getUserById}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};




export { getPostsFromDatabase, 
  uploadImages, 
  getUserNameAndAvatarFromAsyncStorage, 
  handleUpdatePost, 
  getPostKindFromDataBase,
  addLike,
  removeLike,
  getPostsByIdFromDatabase,
  handleAddCommentToPost,
  handleDeleteComment,
  handleEditComment,
  getUserIdFromAsyncStorage,
  getUserByIdFromDatabase };
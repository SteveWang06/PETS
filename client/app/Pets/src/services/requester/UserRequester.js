import axios from "axios";
import { ApiPaths } from "../ApiPaths";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";

const getPostsFromDatabase = async () => {
  try {
    const response = await axios.get(ApiPaths.getAllPost);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getPostsByIdFromDatabase = async (postId) => {
  try {
    const response = await axios.get(`${ApiPaths.getPostById}${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by id:", error);
    throw error;
  }
};

const getUserIdFromAsyncStorage = async () => {
  try {
    //const userInfo = await AsyncStorage.getItem('userInfo');
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData.userId;
    const userToken = userData.token;
    const userName = userData.userName;
    if (userData !== null) {
      // const { userId, userName, token } = JSON.parse(userInfo);
      // return { userId: parseInt(userId), userName, token };
      return { userId: parseInt(userId), userName, userToken };
    } else {
      console.log("No userId found in AsyncStorage");
      return null;
    }
  } catch (error) {
    console.error("Error getting userId from AsyncStorage:", error);
    return null;
  }
};

const getUserNameAndAvatarFromAsyncStorage = async () => {
  try {
    //const userInfo = await AsyncStorage.getItem('userInfo');

    // const userData = useSelector((state) => state.auth.userData);
    // const userId = userData.userId;
    // const userToken = userData.token;
    // const userName = userData.userName;
    // const userAvatar = userData.userAvatar;
    if (userData === null) {
      console.log("No userId found in AsyncStorage");
      return null;
    }

    // const { userName, avatar } = JSON.parse(userInfo);
    // const imageUrl = avatar.imageUrl;
    console.log("UserName:", userName);
    console.log("Avatar:", imageUrl);
    return { userName, userAvatar };
  } catch (error) {
    console.error("Error getting userId from AsyncStorage:", error);
    return null;
  }
};

const uploadImages = async (
  userId,
  userToken,
  caption,
  images,
  callback,
  kind
) => {
  try {
    if (!userId) {
      console.log("No user found in Storage");
      return;
    }

    // Tạo formData và thêm userId vào đó
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("caption", caption);
    formData.append("kind", kind);
    images.forEach((uri, index) => {
      formData.append(`images`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: "image/jpeg",
      });
    });

    // Gửi yêu cầu POST lên server
    const response = await axios.post(ApiPaths.createPost, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    });
    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });

    if (callback) {
      callback();
    }

    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

const handleUpdatePost = async (postId, caption, images, callback, kind) => {
  try {

    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("caption", caption);
    images.forEach((uri, index) => {
      formData.append(`images`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: "image/jpeg",
      });
    });
    formData.append("kind", kind);


    // Gửi yêu cầu cập nhật bài post lên server
    const response = await axios.put(
      `${ApiPaths.updatePost}${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("Error updating post:", error);
    Alert.alert("Error", "An error occurred while updating post");
  }
};

const handleDeletePost = async (token, postId) => {
  try {
    
    const response = await axios.delete(
      `${ApiPaths.deletePost}${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

const getPostKindFromDataBase = async () => {
  try {
    const response = await axios.get(ApiPaths.getAllPostKind);
    return response.data;
  } catch (error) {
    console.error("Error fetching kind:", error);
    throw error;
  }
};

const addLike = async (postId, token) => {
  try {
    // console.log('Like post id:', postId);
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;

    const response = await axios.post(`${ApiPaths.addPostLike}${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Like added:", response.data);
  } catch (error) {
    console.error("Error adding like:", error);
  }
};

const removeLike = async (postId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;
    const response = await axios.delete(
      `${ApiPaths.addPostLike}${postId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Like added:", response.data);
  } catch (error) {
    console.error("Error adding like:", error);
  }
};

const handleAddCommentToPost = async (postId, content, userId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token, userId } = userInfo;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);

    const response = await axios.post(
      `${ApiPaths.addComment}/${postId}/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

const handleDeleteComment = async (commentId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;
    console.log("commentId in handleDeleteComment: ", commentId);
    const response = await axios.delete(
      `${ApiPaths.deleteComment}/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const handleEditComment = async (commentId, content, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;

    const formData = new FormData();
    formData.append("content", content);

    const response = await axios.put(
      `${ApiPaths.editComment}/${commentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

const getUserByIdFromDatabase = async (userId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { userId, token } = userInfo;
    const response = await axios.get(`${ApiPaths.getUserById}${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    
  } catch (error) {
    console.error('Error get product:', error);
    if (error.response) {
      // Server đã trả về phản hồi với mã lỗi khác 2xx
      console.error('Server response:', error.response.data);
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error('Request made but no response received:', error.request);
    } else {
      // Đã xảy ra lỗi trong quá trình thiết lập yêu cầu
      console.error('Error setting up request:', error.message);
    }
  }
};

const getQRcode = async (userId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auth/qr/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error;
  }
};

const handleSubmitEditProfile = async (
  userId,
  userToken,
  username,
  email,
  address,
  birthdayYear,
  birthdayMonth,
  birthdayDay,
  selectedImage
) => {
  const paddedMonth = String(birthdayMonth).padStart(2, "0");
  const paddedDay = String(birthdayDay).padStart(2, "0");
  const birthday = `${birthdayYear}-${paddedMonth}-${paddedDay}`;
  console.log(birthday);
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("birthday", birthday);

    if (selectedImage) {
      formData.append(`image`, {
        uri: selectedImage,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    const response = await fetch(`http://localhost:8080/api/auth/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`, // Assuming you have userToken
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Profile updated successfully", data);
    } else {
      console.error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

const handleRequestChangeRole = async (userId, userToken, requestedRole) => {
  // Gởi yêu cầu lên server với userId và requestedRole
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("requestedRole", requestedRole);
  try {
    const response = await fetch(ApiPaths.changeRole, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`, // Assuming you have userToken
      },
      body: formData,
    });
    const data = await response.json();
    console.log("Response:", data);
    // Xử lý kết quả trả về từ server nếu cần
  } catch (error) {
    console.error("Error:", error);
  }
  setShowRoleModal(false);
};

const handleUpdateProduct = async (token, id, name, type, description, price, images, callback) => {
  try {
  console.log("images handleUpdateProduct: ", images);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((uri, index) => {
      formData.append(`images`, {
        uri: uri,
        name: `image${index}.jpeg`,
        type: "image/jpeg",
      });
    });


    // Gửi yêu cầu cập nhật bài post lên server
    const response = await axios.put(
      `${ApiPaths.updateProduct}${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const handleDeleteProduct = async (productId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;
    const response = await axios.delete(
      `${ApiPaths.deleteProduct}${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showMessage({
      message: "successfully",
      type: "success",
      floating: true,
      duration: 500,
      autoHide: true,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getPostById = async (postId, token) => {
  try {
    // const userInfo = await getUserIdFromAsyncStorage();
    // const { token } = userInfo;
    const response = await axios.get(
      `${ApiPaths.getPostById}${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; 

  } catch (error) {
    console.log("Error: ", error);
  }
};

export {
  getPostsFromDatabase,
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
  getUserByIdFromDatabase,
  getQRcode,
  handleSubmitEditProfile,
  handleRequestChangeRole,
  handleDeletePost,
  handleUpdateProduct,
  handleDeleteProduct,
  getPostById
};

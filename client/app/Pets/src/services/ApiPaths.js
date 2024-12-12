
import { BASE_URL, BASE_URL_DEEP_LEARNING } from "../config";


export const ApiPaths = {
  loginApi: `${BASE_URL}/api/auth/login`,
  createPost: `${BASE_URL}/api/auth/post/`,
  getAllPost: `${BASE_URL}/api/auth/post/`,
  getPostById: `${BASE_URL}/api/auth/post/`,
  updatePost: `${BASE_URL}/api/auth/post/`,
  getAllPostKind: `${BASE_URL}/api/post/kind/`,
  addPostLike: `${BASE_URL}/api/auth/post/`,
  deletePostLike: `${BASE_URL}/api/auth/post/`,
  addComment: `${BASE_URL}/api/post/comment`,
  deleteComment: `${BASE_URL}/api/post/comment`,
  editComment: `${BASE_URL}/api/post/comment`,
  getUserById: `${BASE_URL}/api/auth/user/`,
  userRegister: `${BASE_URL}/api/auth/register`,
  getQRcode: `${BASE_URL}/api/auth/qr/`,
  updateUser: `${BASE_URL}/api/auth`,
  changeRole: `${BASE_URL}/api/role-requests`,
  deletePost: `${BASE_URL}/api/auth/post/`,
  updateProduct: `${BASE_URL}/api/products/`,
  getAllProduct: `${BASE_URL}/api/products`,
  addNewProduct: `${BASE_URL}/api/products`,
  deleteProduct: `${BASE_URL}/api/products/`,
  getUserQrCode: `${BASE_URL}/api/auth/qr`,
  checkLikes: `${BASE_URL}/api/likes/check`,
  likeToggle: `${BASE_URL}/api/likes/toggle`,
  getAllHospitalsAddress: `${BASE_URL}/api/auth/hospital-addresses`,
  predictPetBreed: `${BASE_URL_DEEP_LEARNING}/predict`,
  getChatData: `${BASE_URL}/api/chatbots/user`,
  verifyOtp: `${BASE_URL}/api/auth/verify-otp`,
};


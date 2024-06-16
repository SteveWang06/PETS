
import { BASE_URL } from "../config"


export const ApiPaths = {
    loginApi: 'http://localhost:8080/api/auth/login',
    createPost: 'http://localhost:8080/api/auth/post/',
    getAllPost: 'http://localhost:8080/api/auth/post/',
    getPostById: 'http://localhost:8080/api/auth/post/',
    updatePost: 'http://localhost:8080/api/auth/post/',
    getAllPostKind: 'http://localhost:8080/api/post/kind/',
    addPostLike: 'http://localhost:8080/api/auth/post/',
    deletePostLike: 'http://localhost:8080/api/auth/post/',
    addComment: 'http://localhost:8080/api/post/comment',
    deleteComment: 'http://localhost:8080/api/post/comment',
    editComment: 'http://localhost:8080/api/post/comment',
    getUserById: 'http://localhost:8080/api/auth/user',
    userRegister: 'http://localhost:8080/api/auth/register',
    getQRcode: 'http://localhost:8080/api/auth/qr/',
    updateUser: 'http://localhost:8080/api/auth/',
    changeRole: "http://localhost:8080/api/role-requests"
}

// export const ApiPaths = {
//     loginApi: `${BASE_URL}/login`,
//     createPost: `${BASE_URL}/post/`,
//     getAllPost: `${BASE_URL}/post/`,
//     getPostById: `${BASE_URL}/post/`,
//     updatePost: `${BASE_URL}/post/`,
//     getAllPostKind: 'http://ec2-13-211-239-71.ap-southeast-2.compute.amazonaws.com:8080/api/post/kind/',
//     addPostLike: `${BASE_URL}/post/`,
//     deletePostLike: `${BASE_URL}/post/`,
//     addComment: 'http://ec2-13-211-239-71.ap-southeast-2.compute.amazonaws.com:8080/api/post/comment',
//     deleteComment: 'http://ec2-13-211-239-71.ap-southeast-2.compute.amazonaws.com:8080/api/post/comment',
//     editComment: 'http://ec2-13-211-239-71.ap-southeast-2.compute.amazonaws.com:8080/api/post/comment',
//     getUserById: `${BASE_URL}/user`,
//     userRegister: `${BASE_URL}/register`,
//     getQRcode: `${BASE_URL}/qr/`
// }
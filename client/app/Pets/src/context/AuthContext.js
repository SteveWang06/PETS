// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, createContext, useEffect } from "react";
// import { BASE_URL } from "../config";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [userToken, setUserToken] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [avatar, setAvatar] = useState(null);

//   const login = (email, password) => {
//     setIsLoading(true);

//     axios
//       .post(`${BASE_URL}/login`, {
//         email,
//         password,
//       })
//       .then((res) => {
//         let userInfo = res.data;
//         setUserToken(userInfo.token);
//         setUserName(userInfo.userName);
//         setUserId(userInfo.userId);
//         setAvatar(userInfo.avatar.imageUrl);

//         AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
//         AsyncStorage.setItem("userToken", userInfo.token);
//         AsyncStorage.setItem("userName", userInfo.userName);
//         AsyncStorage.setItem("userId", userInfo.userId.toString());
//         AsyncStorage.setItem("avatar", userInfo.avatar.imageUrl);

//         console.log(`UserToken: ${userInfo.token}`);

//         // checkAsyncStorage();
//       })
//       .catch((err) => {
//         console.error(`Login error ${err}`);
//       });

//     setIsLoading(false);
//   };

//   const logout = () => {
//     setIsLoading(true);
//     setUserToken(null);
//     AsyncStorage.removeItem("userInfo");
//     AsyncStorage.removeItem("userToken");
//     setIsLoading(false);
//     //checkAsyncStorage();
//   };

//   const isLoggedIn = async () => {
//     try {
//       isLoading(true);
//       let userInfo = await AsyncStorage.getItem("userInfo");
//       let userToken = await AsyncStorage.getItem("userToken");
//       userInfo = JSON.parse(userInfo);

//       if (userInfo) {
//         setUserToken(userToken);
//         setUserInfo(userInfo);
//       }

//       isLoading(false);
//     } catch (error) {
//       console.log(`isLogged error ${error}`);
//     }
//   };

//   useEffect(() => {
//     isLoggedIn();
//   }, []);

//   // const checkAsyncStorage = async () => {
//   //   try {
//   //     const userTokenValue = await AsyncStorage.getItem("userToken");
//   //     const userIdValue = await AsyncStorage.getItem("userId");
//   //     const userNameValue = await AsyncStorage.getItem("userName");
//   //     const avatar = await AsyncStorage.getItem("userName");

//   //     if (userTokenValue === null) {
//   //       console.log("no any value saved in AsyncStorage");
//   //     }

      
//   //   } catch (error) {
//   //     console.error("error AsyncStorage:", error);
//   //   }
//   // };

//   return (
//     <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

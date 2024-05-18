import { useState } from 'react';
import axios from "axios";
import { BASE_URL } from "../config";
import login from "../pages/login";

export const AuthProvider =()=>{
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/login`, {
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserToken(userInfo.token);
        setUserInfo(userInfo);

        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        sessionStorage.setItem("userToken", userInfo.token);
        console.log(`UserToken: ${userInfo.token}`);
      })
      .catch((err) => {
        console.error(`Login error ${err.message || err}`);
      });
  }

  const handleLogin = async () => {
    try {
      let userInfo = await sessionStorage.getItem("userInfo");
      let userToken = await sessionStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.log(`isLogged error ${error}`);
    }
  };

  const handleRememberPasswordToggle = () => {
    setRememberPassword(!rememberPassword);
  };

};
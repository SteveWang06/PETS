import React, { useState } from 'react';
import './css/register.css';
import logo from '../image/petlogo.png';
import axios from 'axios';
import {BASE_URL} from "../config";

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post(`${BASE_URL}/register`,{
      email:email,
      username:username,
      password:password,
      rememberPassword:rememberPassword
    })
    .then((res)=>{
      let userInfo=res.data;
      sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
      sessionStorage.setItem('userToken',userInfo.token);
      console.log(`UserToken: ${userInfo.token}`);
    })
    .catch((err)=>{
      console.error(`Register error ${err}`);
    })
  };

  const handleRememberPasswordToggle = () => {
    setRememberPassword(!rememberPassword);
  };

  return (
    <div className="login-container">
      <center><img src={logo} className="login"/></center>
      <h2 align="center">Create an Account</h2>
      <center><p>Create a account to continue</p></center>
      <form>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={handleRememberPasswordToggle}
            />
            I accept terms and conditions
          </label>
        </div>
        <div className="button-group">
          <center><button type="submit" onClick={handleRegister}>
            Sign Up
          </button></center>
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
// login.js

import React, { useState } from 'react';
import axios from 'axios'
import './login.css';
import logo from './petlogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(event){
    event.preventDefault();
    axios.post('localhost:8080/api/auth/login',{email,password})
    .then(res => console.log(res))
    .cath(err => console.log(err))
  }
   const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Password:', rememberPassword);
  };

  const handleRememberPasswordToggle = () => {
    setRememberPassword(!rememberPassword);
  };

  return (
    <div className="login-container">
      <center><img src={logo} className="login"/></center>
      <h2 align="center">Login to Account</h2>
      <center><p>Please enter your email and password to continue</p></center>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={handleRememberPasswordToggle}
            />
            Remember Password
          </label>
        </div>
        <div className="button-group">
          <center><button type="button" onClick={handleLogin}>
            Sign In
          </button></center>
          <p>Don’t have an account ? <a href="register.js">Create Account</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
// register.js

import React, { useState } from 'react';
import './css/register.css';
import logo from './petlogo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleRegister = () => {
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Password:', rememberPassword);
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
          <center><button type="button" onClick={handleRegister}>
            Sign Up
          </button></center>
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
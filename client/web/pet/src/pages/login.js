import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import './css/login.css';
import logo from '../image/petlogo.png';
import axios from "axios";
import { BASE_URL } from "../context/config";
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: inputEmail,
        password: inputPassword,
      });
      const userInfo = res.data;
      console.log(userInfo);

      if (userInfo.token) {
        setUserToken(userInfo.token);
        setUserInfo(userInfo);
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        sessionStorage.setItem("userToken", userInfo.token);
        setAuth({ token: userInfo.token, userInfo });
        setSuccess(true);
        setError('');

      } else {
        throw new Error("Invalid");
      }
    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error(`error: ${err.message || err}`);
    }
  };

  const handleRememberPasswordToggle = () => {
    setRememberPassword(!rememberPassword);
  };

  if (success) {
    return <Navigate to="home"/>;
  } 


  return (
    <div className="login-container">
          <center><img src={logo} className="login" alt="logo" /></center>
          <h2 align="center">Login to Account</h2>
          <center><p>Please enter your email and password to continue</p></center>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                required
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
              <center><button type="submit">
                Sign In
              </button></center>
              <p>Don’t have an account ? <a href="./register">Create Account</a></p>
            </div>
          </form>
        </div>
  );
};

export default Login;

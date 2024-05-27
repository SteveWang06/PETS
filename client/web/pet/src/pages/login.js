import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider.js';
import './css/login.css';
import logo from '../public/dist/img/petlogo.png';
import axios from "axios";
import { BASE_URL } from "../context/config.js";

const Login = () => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [success,setSuccess]=useState(false);
  const {setAuth} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: inputEmail,
        password: inputPassword,
      });
      const userInfo = res.data;
      setUserToken(userInfo.token);
      setUserInfo(userInfo);

      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("userToken", userInfo.token);
      console.log(userInfo);

      if (userInfo.token) {
        setSuccess(true);
        setAuth({ token: userInfo.token, userInfo });
      } else {
        throw new Error("Invalid token");
      }
    } catch (err) {
      alert(`Failed`);
      console.error(`error: ${err.message || err}`);
    }
  }; 

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
  return (
    <>
    {
      success ? (
        <section>
          <h1>Success</h1>
          <br></br>
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ):(
    <div className="login-container">
      <center><img src={logo} className="login"/></center>
      <h2 align="center">Login to Account</h2>
      <center><p>Please enter your email and password to continue</p></center>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
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
          <center><button type="submit" onClick={handleLogin}>
            Sign In
          </button></center>         
          <p>Don’t have an account ? <a href="./register">Create Account</a></p>
        </div>
      </form>
    </div>
    )}
    </>
  );
};
export default Login;
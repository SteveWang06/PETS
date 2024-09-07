import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import './css/login.css';
import logo from '../image/petlogo.png';
import axios from "axios";
import { BASE_URL } from "../context/config";
import { Navigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
 
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
        <body class="hold-transition login-page">
            <div className="login-box">
                {/* /.login-logo */}
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <center><img src={logo} width="100px" height="100px"/></center>
                        <a href="../../index2.html" className="h1"><b>PETS </b>ADMIN</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Please enter your email and password to continue</p>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">                          
                                <input type="email" className="form-control" placeholder="Email"
                                  value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} required/>                              
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password"
                                  value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" checked={rememberPassword}
                                          onChange={handleRememberPasswordToggle}/>
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                {/* /.col */}
                            </div>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <button type="submit" className="btn btn-success btn-block">Sign In</button>
                            </div>
                        </form>
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a>
                        </div>
                        {/* /.social-auth-links */}
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">Create Account</Link>
                        </p>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>
        </body>
 
    );
};
 
export default Login;
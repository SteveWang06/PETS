import React from 'react';
import './App.css';

//UI import
import Header from "./components/Header"; //介面的上面
import SideNav from "./components/SideNav"; //介面左邊的menu
import Footer from "./components/Footer"; //介面的底部

//pages
import Home from "./pages/Home";
import Login from "./pages/login"


function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Home/>
      <Footer/>
      <SideNav/>
      <Login/>
      {/* <Login/> */}
    </div>
  );
}

export default App;

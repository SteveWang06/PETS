import React ,{useEffect, useState }from 'react';
import Header from "../components/Header"; //介面的上面
import SideNav from "../components/SideNav"; //介面左邊的menu
import Footer from "../components/Footer"; //介面的底部
import axios from "axios";
import {Link} from "react-router-dom";
import {BASE_URL} from '../context/config';

const Home=()=>{

    return (
       
        <div>
            <Header/>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            {/* Total User */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <p>Total User</p>
                                        <h3>12</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon fas fa-user" />
                                    </div>
                                    <Link to="/user" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total My Pet Post */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <p>Total My Pet Post</p>
                                        <h3>--</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon far fa-newspaper" />
                                    </div>
                                    <Link to="/post" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total Homeless Pet Post */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <p>Total Homeless Pet Post</p>
                                        <h3>--</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon far fa-newspaper" />
                                    </div>
                                    <Link to="/post" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total Give Pet Post */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <p>Total Give Pet Post</p>
                                        <h3>--</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon far fa-newspaper" />
                                    </div>
                                    <Link to="/post" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>                              
                            {/* Total Shop */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <p>Total Shop</p>
                                        <h3>150</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon fas fa-store" />
                                    </div>
                                    <Link to="/shop" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total Products */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <p>Total Products</p>
                                        <h3>150</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon fas fa-box-open" />
                                    </div>
                                    <Link to="/product" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total Hospital */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <p>Total Hospital</p>
                                        <h3>--</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon fas fa-clinic-medical" />
                                    </div>
                                    <Link to="/hospital" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* Total Doctor */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <p>Total Doctor</p>
                                        <h3>--</h3>
                                    </div>
                                    <div className="icon">
                                        <i className="nav-icon fas fa-user-md" />
                                    </div>
                                    <Link to="/doctors" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                        </div>
                        {/* /.row */}
                        {/* Main row */}
                       
                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            <SideNav/>
            <Footer/>
        </div>
    );
};
 
export default Home;
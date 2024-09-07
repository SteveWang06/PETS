import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';
import {BASE_URL} from "../context/config";

const Shop=()=>{
    const [search, setSearch]=useState('');
    const [currentPage,setCurrentPage]=useState(1);
    const [postsPerPage]=useState(10);
    const [original,setOriginal]=useState([]);

    // const handleSearch=(e)=>{
    //     const value=e.target.value;
    //     setSearch(value);
    //     const searchUsers=value?original.filter(user=>
    //         user
    //     )
    // }

    return(
        <div>
            <Header/>
            <SideNav/>
            <section className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="card-title" style={{fontWeight:'bold',fontSize:'28px'}}>Hospital</h3>
                                        <div className="d-flex">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Shop;
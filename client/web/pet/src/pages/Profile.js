import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';
import { auth } from "../pathApi";
 
const Profile = () => {
    const [success, setSuccess] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [original, setOriginal] = useState([]);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        image: "default-profile.jpg", // Default profile image
        role: "Senior Software Engineer",
        location: "New York, USA"
    });
 
    useEffect(() => {
        fetchData();
    }, []);
 
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
 
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId'); // 確保 userId 是正確取得的
            if (!token || !userId) {
                throw new Error('No token or user ID found');
            }
    
            const res = await axios.get(`${auth.updateUser}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setUserData(res.data);
            console.log('Fetched user data:', res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
 
    const handleSave = () => {
        axios.put(`${auth.updateUser}/user/register`, userData)
            .then(() => alert("Profile updated successfully!"))
            .catch(error => console.error("Error updating profile", error));
    };
 
    return (
        <div>
            <Header />
            <SideNav />
            <section className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4>General information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    value={userData.firstName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    value={userData.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Birthday</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="birthday"
                                                    value={userData.birthday}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="gender"
                                                    value={userData.gender}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={userData.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={userData.city}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>State</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    value={userData.state}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>ZIP</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="zip"
                                                    value={userData.zip}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-3" onClick={handleSave}>Save All</button>
                                </div>
                            </div>
                        </div>
 
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <img
                                        src={userData.image}
                                        alt="Profile"
                                        className="rounded-circle img-fluid"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                    <h5 className="mt-3">{`${userData.firstName} ${userData.lastName}`}</h5>
                                    <p>{userData.role}</p>
                                    <p>{userData.location}</p>
                                    <button className="btn btn-dark btn-sm mr-2">Connect</button>
                                    <button className="btn btn-info btn-sm">Send Message</button>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5>Select profile photo</h5>
                                    <input type="file" className="form-control-file" />
                                    <small className="form-text text-muted">JPG, GIF, or PNG. Max size of 800K</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>User Posts</h4>
                                </div>
                                <div className="card-body">
                                    <p>hi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};
 
export default Profile;
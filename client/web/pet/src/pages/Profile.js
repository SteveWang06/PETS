import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';
import { baseURL, formatImageUrl } from "../pathApi";

const Profile = () => {
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState({
        user: {
            userName: '',
            birthday: '',
            role: { description: '' },
            email: '',
            addresses: [{ address: '' }],
        }
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
            const userId = localStorage.getItem('userId');
            if (!token || !userId) {
                throw new Error('No token found');
            }

            const res = await axios.get(`${baseURL.baseURL}/api/auth/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            user: { ...prevData.user, [name]: value },
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId');
            await axios.put(`${baseURL.baseURL}/api/auth/user/${userId}`, data.user, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setIsEditing(false);
            setSuccess("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            setError("Error updating profile");
        }
    };

    return (
        <div>
            <Header />
            <SideNav />
            <section className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h4>Profile</h4>
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginRight: '3cm', position:'absolute',top:'20px',right:'10px'}}
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img
                                                src={`${formatImageUrl.formatImageUrl}/${data.user.avatar?.imageUrl}`}
                                                style={{ width: '150px', height: '150px' }}
                                                alt="Profile"
                                            />
                                        </div>
                                        <h3 className="profile-username text-center">
                                            {data.user.userName}
                                        </h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>
                                                    <i className="nav-icon fas fa-user" style={{ marginRight: '8px' }}/>
                                                    Name :
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="userName"
                                                        value={data.user.userName}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <p>{data.user.userName}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>
                                                    <i className="fas fa-birthday-cake" style={{ marginRight: '8px' }}></i> 
                                                    Birthday :
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="birthday"
                                                        value={data.user.birthday}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <p>{data.user.birthday}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>
                                                    <i className="fas fa-users-cog" style={{ marginRight: '8px' }}></i>
                                                    Role :
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="role.description"
                                                        value={data.user.role?.description}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <p>{data.user.role?.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>
                                                    <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
                                                    Email :
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={data.user.email}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <p>{data.user.email}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>
                                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                                                    Address :
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="addresses.0.address"
                                                        value={data.user.addresses[0]?.address}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <p>{data.user.addresses[0]?.address}</p>
                                                )}
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <div className="col-12">
                                                <button className="btn btn-primary mt-3" onClick={handleSave}>
                                                    Save All
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="card-header d-flex justify-content-between align-items-center">
                                
                            </div>
                            <div className="col-7">
                                <div className="card">
                                    <div className="card-header p-2">
                                    <h4>Post</h4>
                                    </div>{/* /.card-header */}
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="activity">
                                                {/* Post */}
                                                <div className="post">
                                                    <div className="user-block">
                                                        <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image" />
                                                        <span className="username">
                                                            <a href="#">Jonathan Burke Jr.</a>
                                                            <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                                                        </span>
                                                        <span className="description">Shared publicly - 7:30 PM today</span>
                                                    </div>
                                                    {/* /.user-block */}
                                                    <p>
                                                        Lorem ipsum represents a long-held tradition for designers,
                                                        typographers and the like. Some people hate it and argue for
                                                        its demise, but others ignore the hate as they create awesome
                                                        tools to help create filler text for everyone from bacon lovers
                                                        to Charlie Sheen fans.
                                                    </p>
                                                    <p>
                                                        <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                                                        <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                                                        <span className="float-right">
                                                            <a href="#" className="link-black text-sm">
                                                                <i className="far fa-comments mr-1" /> Comments (5)
                                                            </a>
                                                        </span>
                                                    </p>
                                                    <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                                                </div>
                                                {/* /.post */}
                                                {/* Post */}
                                                <div className="post clearfix">
                                                    <div className="user-block">
                                                        <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image" />
                                                        <span className="username">
                                                            <a href="#">Sarah Ross</a>
                                                            <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                                                        </span>
                                                        <span className="description">Sent you a message - 3 days ago</span>
                                                    </div>
                                                    {/* /.user-block */}
                                                    <p>
                                                        Lorem ipsum represents a long-held tradition for designers,
                                                        typographers and the like. Some people hate it and argue for
                                                        its demise, but others ignore the hate as they create awesome
                                                        tools to help create filler text for everyone from bacon lovers
                                                        to Charlie Sheen fans.
                                                    </p>
                                                    <form className="form-horizontal">
                                                        <div className="input-group input-group-sm mb-0">
                                                            <input className="form-control form-control-sm" placeholder="Response" />
                                                            <div className="input-group-append">
                                                                <button type="submit" className="btn btn-danger">Send</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/* /.post */}
                                                {/* Post */}
                                                <div className="post">
                                                    <div className="user-block">
                                                        <img className="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image" />
                                                        <span className="username">
                                                            <a href="#">Adam Jones</a>
                                                            <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                                                        </span>
                                                        <span className="description">Posted 5 photos - 5 days ago</span>
                                                    </div>
                                                    {/* /.user-block */}
                                                    <div className="row mb-3">
                                                        <div className="col-sm-6">
                                                            <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                                                        </div>
                                                        {/* /.col */}
                                                        <div className="col-sm-6">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <img className="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo" />
                                                                    <img className="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo" />
                                                                </div>
                                                                {/* /.col */}
                                                                <div className="col-sm-6">
                                                                    <img className="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo" />
                                                                    <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                                                                </div>
                                                                {/* /.col */}
                                                            </div>
                                                            {/* /.row */}
                                                        </div>
                                                        {/* /.col */}
                                                    </div>
                                                    {/* /.row */}
                                                    <p>
                                                        <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                                                        <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                                                        <span className="float-right">
                                                            <a href="#" className="link-black text-sm">
                                                                <i className="far fa-comments mr-1" /> Comments (5)
                                                            </a>
                                                        </span>
                                                    </p>
                                                    <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                                                </div>
                                                {/* /.post */}
                                            </div>
                                            {/* /.tab-pane */}
                                            <div className="tab-pane" id="timeline">
                                                {/* The timeline */}
                                                <div className="timeline timeline-inverse">
                                                    {/* timeline time label */}
                                                    <div className="time-label">
                                                        <span className="bg-danger">
                                                            10 Feb. 2014
                                                        </span>
                                                    </div>
                                                    {/* /.timeline-label */}
                                                    {/* timeline item */}
                                                    <div>
                                                        <i className="fas fa-envelope bg-primary" />
                                                        <div className="timeline-item">
                                                            <span className="time"><i className="far fa-clock" /> 12:05</span>
                                                            <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
                                                            <div className="timeline-body">
                                                                Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                                                weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                                                jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                                                quora plaxo ideeli hulu weebly balihoo...
                                                            </div>
                                                            <div className="timeline-footer">
                                                                <a href="#" className="btn btn-primary btn-sm">Read more</a>
                                                                <a href="#" className="btn btn-danger btn-sm">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* END timeline item */}
                                                    {/* timeline item */}
                                                    <div>
                                                        <i className="fas fa-user bg-info" />
                                                        <div className="timeline-item">
                                                            <span className="time"><i className="far fa-clock" /> 5 mins ago</span>
                                                            <h3 className="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    {/* END timeline item */}
                                                    {/* timeline item */}
                                                    <div>
                                                        <i className="fas fa-comments bg-warning" />
                                                        <div className="timeline-item">
                                                            <span className="time"><i className="far fa-clock" /> 27 mins ago</span>
                                                            <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                                                            <div className="timeline-body">
                                                                Take me to your leader!
                                                                Switzerland is small and neutral!
                                                                We are more like Germany, ambitious and misunderstood!
                                                            </div>
                                                            <div className="timeline-footer">
                                                                <a href="#" className="btn btn-warning btn-flat btn-sm">View comment</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* END timeline item */}
                                                    {/* timeline time label */}
                                                    <div className="time-label">
                                                        <span className="bg-success">
                                                            3 Jan. 2014
                                                        </span>
                                                    </div>
                                                    {/* /.timeline-label */}
                                                    {/* timeline item */}
                                                    <div>
                                                        <i className="fas fa-camera bg-purple" />
                                                        <div className="timeline-item">
                                                            <span className="time"><i className="far fa-clock" /> 2 days ago</span>
                                                            <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                                                            <div className="timeline-body">
                                                                <img src="https://placehold.it/150x100" alt="..." />
                                                                <img src="https://placehold.it/150x100" alt="..." />
                                                                <img src="https://placehold.it/150x100" alt="..." />
                                                                <img src="https://placehold.it/150x100" alt="..." />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* END timeline item */}
                                                    <div>
                                                        <i className="far fa-clock bg-gray" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /.tab-pane */}
                                            <div className="tab-pane" id="settings">
                                                <form className="form-horizontal">
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="inputName" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="inputSkills" placeholder="Skills" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button type="submit" className="btn btn-danger">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* /.tab-pane */}
                                        </div>
                                        {/* /.tab-content */}
                                    </div>{/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Profile;
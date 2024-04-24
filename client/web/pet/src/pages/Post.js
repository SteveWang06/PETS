import "./css/Post.css";
import React, { useState } from 'react';

const Post = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        console.log('提交的值:', inputValue);
        setInputValue('');
        setShowPopup(false);
    };

    return(
        <div className="Post">
            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h5>Total My Pet Post</h5>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    <h3>15,830</h3>
                    <p><span className="label">+12%</span>Up from yesterday</p>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h5>Total Homeless Pet Post</h5>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>                   
                    <h3>6,780</h3>                                
                    <p><span className="label">+52%</span>Down from yesterday</p>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h5>Total Give Pet Post</h5>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    <h3>6,784</h3>                    
                    <p><span className="label">+52%</span>Up from yesterday</p>
                </div>
            </div>

            <div className="up">
                <input type="text" className="Search" placeholder="Search" />
                <button className="add-new-post" onClick={togglePopup}>Add New Post Type</button>
            </div>

            {showPopup && (
                <div className="popup">
                    <h3>Type name</h3>
                    <input type="text" value={inputValue} onChange={handleInputChange} />               
                    <button className="cancel"onClick={togglePopup}>Cancel</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
            )}

        </div>
    );
}

export default Post;

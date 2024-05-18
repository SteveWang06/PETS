import React, { useState } from 'react';
import "./css/Shop.css";
import Contain from "../components/ContainerDashboard";
import Navi from "../components/NavigationTopBar";
import Footer from "../components/Footer";

const Shop = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [createByUser, setCreateByUser] = useState('');
    const [status, setStatus] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCreateByUserChange = (event) => {
        setCreateByUser(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = () => {
        console.log('新增的資料:', id, name, address, createByUser, status);
        setId('');
        setName('');
        setAddress('');
        setCreateByUser('');
        setStatus('');
        setShowPopup(false);
    };

    return (
        <div className="Post">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名稱</th>
                        <th>地址</th>
                        <th>創建者</th>
                        <th>狀態</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 這裡渲染資料列 */}
                    <tr>
                        <td>1</td>
                        <td>商品名稱</td>
                        <td>商品地址</td>
                        <td>創建者</td>
                        <td>啟用</td>
                        <td>
                            <button>編輯</button>
                            <button>刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="up">
                <button className="add-new-post" onClick={togglePopup}>新增資料</button>
            </div>

            {showPopup && (
                <div className="popup">
                    <h3>新增資料</h3>
                    <input type="text" placeholder="ID" value={id} onChange={handleIdChange} />
                    <input type="text" placeholder="名稱" value={name} onChange={handleNameChange} />
                    <input type="text" placeholder="地址" value={address} onChange={handleAddressChange} />
                    <input type="text" placeholder="創建者" value={createByUser} onChange={handleCreateByUserChange} />
                    <select value={status} onChange={handleStatusChange}>
                        <option value="啟用">啟用</option>
                        <option value="停用">停用</option>
                    </select>
                    <button className="cancel" onClick={togglePopup}>取消</button>
                    <button type="submit" onClick={handleSubmit}>新增</button>
                </div>
            )}
            <Contain/>
            <Navi/>
            <Footer/>
        </div>
    );
}

export default Shop;
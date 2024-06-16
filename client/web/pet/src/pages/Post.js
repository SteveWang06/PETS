import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header"; // 介面的上面
import SideNav from "../components/SideNav"; // 介面左邊的 menu
import Footer from "../components/Footer"; // 介面的底部
import { BASE_URL } from "../context/config";

const Post = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [Caption, setCaption] = useState('');
  const [UserId, setUserId] = useState('');
  const [Kind, setKind] = useState('');
  const [Image, setImage] = useState(null);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.get(`${BASE_URL}/post/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('Invalid data');
      }

      const formData = new FormData();
      formData.append('caption', Caption);
      formData.append('kind', Kind);
      formData.append('userId', UserId);

      if (Image) {
        formData.append('images', Image);
      }

      await axios.post(`${BASE_URL}/post/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchData();
      setCaption('');
      setUserId('');
      setKind('');
      setImage(null);
      setCreate(false);
    } catch (error) {
      console.error('Error creating data: ', error);
      setError('Error creating data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${BASE_URL}/post/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data: ', error);
      setError('Error deleting data');
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setCaption(item.caption);
    setUserId(item.userId); 
    setKind(item.postKind);
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token || !editId) {
        throw new Error('No token or data found');
      }

      const formData = new FormData();
      formData.append('caption', Caption);
      formData.append('kind', Kind);

      if (Image) {
        formData.append('images', Image);
      } else {
        formData.append('images', new File([], data.find(item => item.id === editId).postImages[0].imageUrl.split('/').pop()));
      }

      console.log('Updating data with:', {
        caption: Caption,
        kind: Kind,
        image: Image ? Image.name : 'No new image'
      });

      const response = await axios.put(`${BASE_URL}/post/${editId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Server response:', response);

      const updatedData = data.map(item => item.id === editId ? {
        ...item,
        caption: Caption,
        postKind: Kind,
        postImages: Image ? [{ ...item.postImages[0], imageUrl: URL.createObjectURL(Image) }] : item.postImages
      } : item);
      setData(updatedData);
      setEditId(null);
      setCaption('');
      setKind('');
      setUserId('');
      setImage(null);
    } catch (error) {
      console.error('Error updating data: ', error);
      setError('Error updating data');
    }
  };

  return (
    <div>
      <Header />
      <SideNav />
      <section className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>Post</h3>
                  <button className="btn btn-primary float-right" onClick={() => setCreate(true)}>Create</button>
                </div>
                <div className="card-body">
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Images</th>
                        <th>Caption</th>
                        <th>Kind</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(item => (
                        <tr key={item.id}>
                          {editId === item.id ? (
                            <>
                              <td>{item.authorName}</td>
                              <td>
                                <input 
                                  type="file" 
                                  onChange={(e) => setImage(e.target.files[0])}
                                  placeholder="Edit Image"
                                />
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={Caption} 
                                  onChange={(e) => setCaption(e.target.value)} 
                                  placeholder="Edit caption"
                                />
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={Kind} 
                                  onChange={(e) => setKind(e.target.value)} 
                                  placeholder="Edit Kind"
                                />
                              </td>
                              <td>
                                <button onClick={handleSave} className="btn btn-primary">Save</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{item.authorName}</td>
                              <td>{item.postImages[0].imageUrl.split('/').pop()}</td>
                              <td>{item.caption}</td>
                              <td>{item.postKind}</td>
                              <td>
                                <button className="btn btn-block btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-block btn-primary" onClick={() => handleDelete(item.id)}>Delete</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {create && (
                    <div>
                      <input 
                        type="text" 
                        value={Caption} 
                        onChange={(e) => setCaption(e.target.value)} 
                        placeholder="Enter caption"
                      />
                      <input 
                        type="text" 
                        value={UserId} 
                        onChange={(e) => setUserId(e.target.value)} 
                        placeholder="Enter UserId"
                      />
                      <input 
                        type="text" 
                        value={Kind} 
                        onChange={(e) => setKind(e.target.value)} 
                        placeholder="Enter Kind"
                      />
                      <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder="Choose Image"
                      />
                      <button onClick={handleCreate} className="btn btn-primary">Save</button>
                    </div>
                  )}
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

export default Post;




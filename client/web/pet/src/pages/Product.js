import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header"; 
import SideNav from "../components/SideNav"; 
import Footer from "../components/Footer"; 
import { BASE } from "../context/config";

const Item = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [showCreate, setShowCreate] = useState(false);

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
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.get(`${BASE}/products`, {
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
      formData.append('name', name);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('description', description);

      if (image) {
        formData.append('images', image);
      }

      await axios.post(`${BASE}/products`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchData();
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage(null);
      setSuccess('Create Success');
      setShowCreate(false);
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
      await axios.delete(`${BASE}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(prevData => prevData.filter(item => item.id !== id));
      setSuccess('Delete Success');
    } catch (error) {
      console.error('Error deleting data: ', error);
      setError('Error deleting data');
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setType(item.type);
    setPrice(item.price);
    setDescription(item.description);
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token || !editId) {
        throw new Error('No token or data found');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('description', description);

      if (image) {
        formData.append('images', image);
      }

      console.log('Updating data with:', {
        name,
        type,
        price,
        description,
        image: image ? image.name : 'No new image'
      });

      const response = await axios.put(`${BASE}/products/${editId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Server response:', response);

      const updatedData = data.map(item => item.id === editId ? {
        ...item,
        name,
        type,
        price,
        description,
        images: image ? [{ ...item.images[0], imageUrl: `${BASE}/api/${image.name}` }] : item.images
      } : item);

      setData(updatedData);
      setEditId(null);
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage(null);
      setSuccess('Edit Success')
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>Products</h3>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}>Create</button>
                  </div>
                </div>
                <div className="card-body">
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{color: 'green'}}>{success}</p>}
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(item => (
                        <tr key={item.id}>
                          {editId === item.id ? (
                            <>
                              <td>
                                <input 
                                  type="text" 
                                  value={name} 
                                  onChange={(e) => setName(e.target.value)} 
                                  placeholder="Edit name"
                                />
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={type} 
                                  onChange={(e) => setType(e.target.value)} 
                                  placeholder="Edit type"
                                />
                              </td>
                              <td>
                                <input 
                                  type="number" 
                                  value={price} 
                                  onChange={(e) => setPrice(e.target.value)} 
                                  placeholder="Edit price"
                                />
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={description} 
                                  onChange={(e) => setDescription(e.target.value)} 
                                  placeholder="Edit description"
                                />
                              </td>
                              <td>
                                <input 
                                  type="file" 
                                  onChange={(e) => setImage(e.target.files[0])}
                                  placeholder="Edit Image"
                                />
                              </td>
                              <td>
                                <button onClick={handleSave} className="btn btn-primary">Save</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{item.name}</td>
                              <td>{item.type}</td>
                              <td>{item.price}</td>
                              <td>{item.description}</td>
                              <td>
                                {item.images && item.images.length>0 && (
                                  <img src={`${BASE}/${item.images[0].imageUrl}`}
                                       alt="Item"
                                       style={{width:'100px',height:'100px'}}
                                  />
                                )}
                              </td>
                              <td>
                                <button className="btn btn-block btn-primary" style={{marginRight:'10px'}} onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-block btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCreate && (
        <div className="modal" style={{display:'block',backgroundColor:'rgba(0,0,0,0.5',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:999}}>
          <div className="modal-dialog" style={{maxWidth:'500px',margin:'10% auto',backgroundColor:'white',padding:'20px',borderRadius:'5px'}}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Item</h5>
                <button type="button" className="close" onClick={()=>setShowCreate(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter name"
                />
                <input 
                  type="text" 
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  placeholder="Enter type"
                />
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="Enter price"
                />
                <input 
                  type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Enter description"
                />
                <input 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  placeholder="Upload Image"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>setShowCreate(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCreate}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Item;

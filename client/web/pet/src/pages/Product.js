import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";
import { products } from '../pathApi';

const Products = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [UserId, setUserId] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [original, setOriginal] = useState([]);

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
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.get(`${products.getAllProducts}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(res.data);
      setOriginal(res.data);
      console.log(res);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Invalid data');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('userId', UserId);

      if (image) {
        formData.append('images', image);
      }

      await axios.post(`${products.getAllProducts}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      fetchData();
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setUserId('');
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
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${products.getAllProducts}/${id}`, {
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
      const token = localStorage.getItem('userToken');
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
      } else {
        const existingImageUrl = data.find(item => item.id === editId)?.imageUrl?.[0] || '';
        formData.append('images', new File([], existingImageUrl.split('/').pop()));
      }

      console.log('Updating data with:', {
        name,
        type,
        price,
        description,
        image: image ? image.name : 'No new image'
      });

      const response = await axios.put(`${products.getAllProducts}/${editId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('Server response:', response);

      const updatedData = data.map(item => item.id === editId ? {
        ...item,
        name,
        type,
        price,
        description,
        images: image ? [{ ...item.imageUrl[0], imageUrl: `${image.name}` }] : item.imageUrl
      } : item);

      fetchData();
      setData(updatedData);
      setOriginal(updatedData);
      setEditId(null);
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage(null);
      setSuccess('Edit Success');
    } catch (error) {
      console.error('Error updating data: ', error);
      setError('Error updating data');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const searchedUsers = value ? original.filter(data =>
      data.name.toLowerCase().includes(value.toLowerCase()) ||
      data.description.toLowerCase().includes(value.toLowerCase()) ||
      data.type.toLowerCase().includes(value.toLowerCase())
    ) : original;
    setData(searchedUsers);
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
                    <div className="d-flex">
                      <input
                        className="form-control form-control-sidebar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearch}
                      />
                      <button className="btn btn-primary" style={{ width: '100px' }} onClick={() => setShowCreate(true)}>Create</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th style={{ width: '350px' }}>Images</th>
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
                                  style={{ width: '50%', margin: '0 auto', display: 'block' }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={type}
                                  onChange={(e) => setType(e.target.value)}
                                  placeholder="Edit type"
                                  style={{ width: '50%', margin: '0 auto', display: 'block' }}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                  placeholder="Edit price"
                                  style={{ width: '50%', margin: '0 auto', display: 'block' }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Edit description"
                                  style={{ width: '50%', margin: '0 auto', display: 'block' }}
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
                                {item.imageUrl && item.imageUrl.length > 0 && (
                                  <img
                                  src={`${products.getAllProducts}/${item.imageUrl[0]}`}
                                    alt="Item"
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                )}
                              </td>

                              <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => handleEdit(item)}>Edit</button>
                                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>

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
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
          <div className="modal-dialog" style={{ maxWidth: '500px', margin: '5% auto', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Product</h5>
                <button type="button" className="close" onClick={() => setShowCreate(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter type"
                  className="form-control mb-2"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={UserId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter UserId"
                  className="form-control mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  aria-label="Upload Image"
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Close</button>
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

export default Products;

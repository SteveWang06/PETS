import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";
import { BASE_URL } from "../context/config";

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(res.data);
      setOriginal(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const newUser = { username, email, password };

      console.log(newUser);

      await axios.post(`${BASE_URL}/register`, newUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setSuccess(`Create Success`);
      setShowCreate(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user: ', error);
      setError('Error creating user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      setSuccess('Delete Success');
    } catch (error) {
      console.error('Error deleting user: ', error);
      setError('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setUsername(user.userName);
    setEmail(user.email);
    setPassword('');
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('userToken');
      if (!token || !editId) {
        throw new Error('No token or data found');
      }

      const updatedUser = { username,email };

      const res=await axios.put(`${BASE_URL}/${editId}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res);

      const updatedData = users.map(user => user.id === editId ? {
        ...user,
        username:username,
        email
      } : user);

      setUsers(updatedData);
      setOriginal(updatedData);
      setEditId(null);
      setUsername('');
      setEmail('');
      setSuccess('Edit Success');
    } catch (error) {
      console.error('Error updating data: ', error.response?error.response.data:error.message);
      setError('Error updating data');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const searchedUsers = value ? original.filter(user =>
      user.userName.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    ) : original;
    setUsers(searchedUsers);
  };

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
                    <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>User</h3>
                    <div className="d-flex">
                      <input
                        className="form-control form-control-sidebar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearch}
                      />
                      <button className="btn btn-primary" onClick={() => setShowCreate(true)}>Create</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map(user => (
                        <tr key={user.id}>
                          {editId === user.id ? (
                            <>
                              <td>
                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  placeholder="Edit Username"
                                  style={{ width: '100%' }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Edit Email"
                                  style={{ width: '100%' }}
                                />
                              </td>
                              <td>
                                <button onClick={handleSave} className="btn btn-primary">Save</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{user.userName}</td>
                              <td>{user.email}</td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <button className="btn btn-block btn-primary" style={{ width: '80px', height: '40px', marginRight: '10px' }} onClick={() => handleEdit(user)}>Edit</button>
                                  <button className="btn btn-block btn-danger" style={{ width: '80px', height: '40px' }} onClick={() => handleDelete(user.id)}>Delete</button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button onClick={prevPage} className="btn btn-light" disabled={currentPage === 1}>&laquo;</button>
                    {Array.from({ length: Math.ceil(users.length / postsPerPage) }, (_, index) => (
                      <button key={index + 1} onClick={() => paginate(index + 1)} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}>{index + 1}</button>
                    ))}
                    <button onClick={nextPage} className="btn btn-light" disabled={currentPage === Math.ceil(users.length / postsPerPage)}>&raquo;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCreate && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
          <div className="modal-dialog" style={{ maxWidth: '500px', margin: '10% auto', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create User</h5>
                <button type="button" className="close" onClick={() => {
                  setShowCreate(false);
                  setUsers(original);
                }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowCreate(false);
                  setUsers(original);
                }}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleCreate}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default User;

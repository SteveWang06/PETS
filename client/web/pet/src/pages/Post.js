import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header"; 
import SideNav from "../components/SideNav"; 
import Footer from "../components/Footer"; 
import { BASE_URL } from "../context/config";

const Post = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [Caption, setCaption] = useState('');
  const [UserId, setUserId] = useState('');
  const [Kind, setKind] = useState('');
  const [Image, setImage] = useState(null);
  const [filter, setFilter]=useState('');
  const [original, setOriginal]=useState([]);
  const [success, setSuccess]=useState('');
  const [showCreate, setShowCreate]=useState(false);
  const [search, setSearch]=useState('');
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage]=useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(success){
      const timer=setTimeout(()=>setSuccess(''),3000);
      return ()=>clearTimeout(timer);
    }
  },[success]);

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
      setOriginal(res.data);
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
      await axios.delete(`${BASE_URL}/post/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(prevData => prevData.filter(item => item.id !== id));
      setOriginal(prevData=>prevData.filter(item=>item.id!==id));
      setSuccess('Delete Success');
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
        postImages: Image ? [{ ...item.postImages[0], imageUrl: `${BASE_URL}/api/auth/${Image.name}` }] : item.postImages
      } : item);

      setData(updatedData);
      setOriginal(updatedData);
      setEditId(null);
      setCaption('');
      setKind('');
      setUserId('');
      setImage(null);
      setSuccess('Edit Success')
    } catch (error) {
      console.error('Error updating data: ', error);
      setError('Error updating data');
    }
  };

  const handleFilter=(e)=>{
    const selectFilter=e.target.value;
    setFilter(selectFilter);
    const filteredData=selectFilter ? original.filter(item=>item.postKind===selectFilter) : original;
    setData(filteredData);
  };

  const handleSearch=(e)=>{
    const value=e.target.value;
    setSearch(value);
    const searchedData=value?original.filter(item=>
      item.caption.toLowerCase().includes(value.toLowerCase())||
      item.authorName.toLowerCase().includes(value.toLowerCase())||
      item.postKind.toLowerCase().includes(value.toLowerCase())
    ):original;
    setData(searchedData);
  };

  const indexOfLastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOfLastPost-postsPerPage;
  const currentPosts=data.slice(indexOfFirstPost,indexOfLastPost);

  const pageinate=(pageNumber)=>setCurrentPage(pageNumber);

  const nextPage=()=>{
    if(currentPage<Math.ceil(data.length/postsPerPage)){
      setCurrentPage(currentPage+1);
    }
  };

  const prevPage=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
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
                    <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>Post</h3>
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
                  {success && <p style={{color: 'green'}}>{success}</p>}
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th style={{width:'350px'}}>Images</th>
                        <th>Caption</th>
                        <th>Kind
                          <div style={{float: 'right'}}>
                          <select value={filter} onChange={handleFilter} className="form-comtrol">
                            <option value="">All</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="other">Other</option>
                          </select>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map(item => (
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
                                  style={{width:'50%', margin:'0 auto', display:'block'}}
                                />
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={Kind} 
                                  onChange={(e) => setKind(e.target.value)} 
                                  placeholder="Edit Kind"
                                  style={{width:'50%', margin:'0 auto', display:'block'}}
                                />
                              </td>
                              <td>
                                <button onClick={handleSave} className="btn btn-primary">Save</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{item.authorName}</td>
                              <td>
                                {item.postImages && item.postImages.length>0 && (
                                  <img src={`${BASE_URL}/${item.postImages[0].imageUrl}`}
                                       alt="Post"
                                       style={{width:'100px',height:'100px'}}
                                  />
                                )}
                              </td>
                              <td>{item.caption}</td>
                              <td>{item.postKind}</td>
                              <td>
                                <div style={{display:'flex',alignItems:'center'}}>
                                <button className="btn btn-primary" style={{width:'80px',height:'40px',marginRight:'10px'}} onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-danger" style={{width:'80px',height:'40px'}} onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button onClick={prevPage} className="btn btn-light" disabled={currentPage===1}>&laquo;</button>
                    {Array.from({length:Math.ceil(data.length/postsPerPage)},(_,index)=>(
                      <button key={index+1} onClick={()=>pageinate(index+1)} className={`btn ${currentPage===index+1 ? `btn-primary`:'btn-light'}`}>{index+1}</button>
                    ))}
                    <button onClick={nextPage} className="btn btn-light" disabled={currentPage===Math.ceil(data.length/postsPerPage)}>&raquo;</button>
                  </div>
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
                <h5 className="modal-title">Create Post</h5>
                <button type="button" className="close" onClick={()=>setShowCreate(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={Caption}
                  onChange={(e)=>setCaption(e.target.value)}
                  placeholder="Enter caption"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={UserId}
                  onChange={(e)=>setUserId(e.target.value)}
                  placeholder="Enter UserId"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={Kind}
                  onChange={(e)=>setKind(e.target.value)}
                  placeholder="Enter Kind"
                  className="form-control mb-2"
                />
                <input
                  type="file"
                  onChange={(e)=>setImage(e.target.files[0])}
                  className="form-control mb-2"
                />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={()=>setShowCreate(false)}>Cancel</button>
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

export default Post;
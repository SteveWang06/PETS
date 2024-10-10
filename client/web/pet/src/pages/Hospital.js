import React, { useState } from 'react';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';

const Hospital = () => {
    const [search, setSearch] = useState('');
    const [hospitals, setHospitals] = useState([
        { id: '00001', name: 'Hospital Name 1', address: '089 ABC', createdBy: 'User Name', status: 'Accepted' },
        { id: '00002', name: 'Hospital Name 2', address: '979 ASD', createdBy: 'User Name', status: 'In Progress' },
        { id: '00003', name: 'Hospital Name 3', address: '123 XYZ', createdBy: 'User Name', status: 'Accepted' },
        { id: '00004', name: 'Hospital Name 4', address: '456 DEF', createdBy: 'User Name', status: 'In Progress' }
    ]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
    };

    const filteredHospitals = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(search) ||
        hospital.address.toLowerCase().includes(search) ||
        hospital.createdBy.toLowerCase().includes(search)
    );

    // 按照状态分类医院
    const inProgressHospitals = filteredHospitals.filter(hospital => hospital.status === 'In Progress');
    const acceptedHospitals = filteredHospitals.filter(hospital => hospital.status === 'Accepted');

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
                                        <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>Hospital</h3>
                                        <input 
                                            type="text" 
                                            placeholder="Search..." 
                                            value={search} 
                                            onChange={handleSearch} 
                                            style={{ padding: '10px', fontSize: '16px' }}
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4>In Progress</h4>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created By User</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inProgressHospitals.map(hospital => (
                                                        <tr key={hospital.id}>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.id}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.name}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.address}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.createdBy}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                            <h4>Accepted</h4>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created By User</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {acceptedHospitals.map(hospital => (
                                                        <tr key={hospital.id}>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.id}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.name}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.address}</td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hospital.createdBy}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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

export default Hospital;

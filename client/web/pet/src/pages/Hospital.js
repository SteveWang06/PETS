import React, { useState } from 'react';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';

const Hospital = () => {
    const [selected, setSelected] = useState('Processing'); 

    const categories = ['Processing', 'Accepted'];

    const acceptedData = [
        { name: 'John Doe', address: '123 Main St' },
        { name: 'Jane Smith', address: '456 Elm St' },
        { name: 'Michael Johnson', address: '789 Oak St' },
    ];

    const processingData = [
        { name: 'Alice Brown', address: '321 Maple St' },
        { name: 'Bob White', address: '654 Pine St' },
        { name: 'Cathy Green', address: '987 Cedar St' },
    ];

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
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Selection Header */}
                                    <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                                        {categories.map((category) => (
                                            <li
                                                key={category}
                                                onClick={() => setSelected(category)}
                                                style={{
                                                    marginRight: '20px',
                                                    cursor: 'pointer',
                                                    color: selected === category ? 'blue' : 'black',
                                                    fontWeight: selected === category ? 'bold' : 'normal'
                                                }}
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>

                                    {selected === 'Accepted' && (
                                        <table className="table table-bordered" style={{ marginTop: '20px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {acceptedData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.address}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {selected === 'Processing' && (
                                        <table className="table table-bordered" style={{ marginTop: '20px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {processingData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.address}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default Hospital;

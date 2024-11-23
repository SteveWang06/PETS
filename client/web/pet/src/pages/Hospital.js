import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Hospital = () => {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState('Processing');
    const [acceptedData, setAcceptedData] = useState([]);
    const [processingData, setProcessingData] = useState([]);

    const categories = ['Processing', 'Accepted'];

    // Fetch hospital addresses data on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/api/auth/hospital-addresses')
            .then((response) => {
                const hospitalData = response.data;
                // Assuming 'accepted' data is based on some logic in your response
                setAcceptedData(hospitalData.filter(item => item.status === 'Accepted'));
                setProcessingData(hospitalData.filter(item => item.status === 'Processing'));
            })
            .catch((error) => {
                console.error("There was an error fetching the hospital addresses!", error);
            });
    }, []);

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
                                        <h3 className="card-title" style={{ fontWeight: 'bold', fontSize: '28px' }}>{t('hospital')}</h3>
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
                                                    <th>{t('hospital_name')}</th>
                                                    <th>{t('hospital_address')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {acceptedData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.user.username}</td>
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
                                                    <th>{t('hospital_name')}</th>
                                                    <th>{t('hospital_address')}</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {processingData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.user.username}</td>
                                                        <td>{item.address}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                style={{ width: '80px', height: '40px', marginRight: '10px' }}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                style={{ width: '80px', height: '40px' }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
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

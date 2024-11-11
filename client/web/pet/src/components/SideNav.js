import React, {useContext}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {AuthContext} from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function SideNav() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { setAuth } = useContext(AuthContext);
    const navigate=useNavigate();
    const getNavLinkClass = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        setAuth(null);
        navigate('/')
    }

    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/home" className="brand-link">
                    <img src="dist/img/petlogo.png" alt="PET Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">PET ADMIN</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <Link to="/profile" className="d-block">FCU Admin</Link>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}
                            <li className="nav-item">
                                <Link to="/home" className={getNavLinkClass('/home')}>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>{t('dashboard')}</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user" className={getNavLinkClass('/user')}>
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        {t('user')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shop" className={getNavLinkClass('/shop')}>
                                    <i className="nav-icon fas fa-store" />
                                    <p>
                                        {t('shop')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/product" className={getNavLinkClass('/product')}>
                                    <i className="nav-icon fas fa-box-open" />
                                    <p>
                                        {t('products')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/hospital" className={getNavLinkClass('/hospital')}>
                                    <i className="nav-icon fas fa-clinic-medical" />
                                    <p>
                                        {t('hospital')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/forms" className={getNavLinkClass('/forms')}>
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        {t('forms')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/doctors" className={getNavLinkClass('/doctors')}>
                                    <i className="nav-icon fas fa-user-md" />
                                    <p>
                                        {t('doctors')}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/post" className={getNavLinkClass('/post')}>
                                    <i className="nav-icon far fa-newspaper" />
                                    <p>
                                        {t('post')}
                                    </p>
                                </Link>
                            </li>
                            <p>
                                <hr color="white" />
                            </p>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-cogs" />
                                    <p>
                                        {t('setting')}
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to='/' className={getNavLinkClass('/')} onClick={handleLogout} >
                                    <i className="nav-icon fas fa-sign-out-alt" />
                                    <p>
                                        {t('logout')}
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    );
}

export default SideNav;
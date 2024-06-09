import React from 'react';
import {Link} from 'react-router-dom';

function SideNav() {
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="#" className="brand-link">
                    <img src="dist/img/petlogo.png" alt="PET Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">PET ADMIN</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">FCU Admin</a>
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
                            <li className="nav-item menu-open">
                                <Link to="/home" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Dashboard</p>
                                </Link>                                
                            </li>
                            <li className="nav-item">
                                <a href="pages/widgets.html" className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        User
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Shop
                                    </p>
                                </a>                            
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-chart-pie" />
                                    <p>
                                        Products
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-tree" />
                                    <p>
                                        Hospital
                                    </p>
                                </a>                            
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Forms
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-table" />
                                    <p>
                                        Doctors
                                    </p>
                                </a>                            
                            </li>
                            <li className="nav-item">
                                <Link to="/post" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        Post
                                    </p>
                                </Link>
                            </li>
                            <p>
                                <hr color="white"/>
                            </p>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        Setting
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        Logout
                                    </p>
                                </a>
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
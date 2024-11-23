import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
 
 
function Header() {
    const { t, i18n } = useTranslation();
 
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Change language function
    };
    return (
        <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/home" className="nav-link">{t('home')}</Link>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Language Dropdown */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="fas fa-globe" /> {t('language')}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" onClick={() => changeLanguage('en')}>English</a>
                            <a className="dropdown-item" onClick={() => changeLanguage('zh_TW')}>中文</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}
 
        </div>
    );
}
 
export default Header;
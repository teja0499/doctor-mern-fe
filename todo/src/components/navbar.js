import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    };

    const getNavLinkClass = (path) => (
        pathname === path ? 'nav-link active fw-bold' : 'nav-link'
    );

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.length === 0 && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/')} to="/">
                                        User
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/doctor_login')} to="/doctor_login">
                                        Doctor
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin_login')} to="/admin_login">
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {localStorage.getItem("userType") === "doctor" && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/consultation_req')} to="/consultation_req">
                                        New Consultations
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/consultation_history')} to="/consultation_history">
                                        History
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {localStorage.getItem("userType") === "user" && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_doctor')} to="/all_doctor">
                                        Doctors
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/user_consultation_history')} to="/user_consultation_history">
                                        Consultation History
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {localStorage.getItem("userType") === "admin" && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/new_doctor')} to="/new_doctor">
                                        New Doctor Requests
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_patients')} to="/all_patients">
                                        Users
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_doctor')} to="/all_doctor">
                                        Doctors
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_prescription')} to="/all_prescription">
                                        Consultations
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_prescription')} to="/all_prescription">
                                        Add admin
                                    </Link>
                                </li> */}
                            </ul>
                        )}
                    </div>
                    {localStorage.length !== 0 && (
                        <button type="button" className="btn btn-danger" onClick={handleLogOut}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
}

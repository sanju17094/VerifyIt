import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Navbar';
import './Mainlayout.css';

function Mainlayout() {
    return (
        <>
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <h5><Link to="personal_details">Personal Details</Link></h5>
                    <p>Let's get you started!</p>
                    <h5><Link to="professional_details">Professional Details</Link></h5>
                    <p>Fill up your past experiences</p>
                    <h5><Link to="educational_details">Educational Details</Link></h5>
                    <p>Provide details about your degree</p>
                    <h5><Link to="preview_all"></Link>All Done!</h5>
                    <p>All done, let's go!</p>
                </div>
                <div className="right-container">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Mainlayout;

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from '../components/Navbar';
import './Mainlayout.css';

function Mainlayout() {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5; 

    const getStepFromPath = (path) => {
        switch (path) {
            case '/personal_details':
                return 1;
            case '/professional_details':
                return 2;
            case '/educational_details':
                return 3;
            case '/documents':
                return 4;
            case '/preview_all':
                return 5;
            default:
                return 1;
        }
    };

    useEffect(() => {
        const step = getStepFromPath(location.pathname);
        setCurrentStep(step);
    }, [location.pathname]);

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
                    <h5><Link to="documents">Profile Photo & Documents</Link></h5>
                    <p>Upload profile photo & documents</p>
                    <h5><Link to="preview_all">All Done!</Link></h5>
                    <p>All done, let's go!</p>
                </div>
                <div className="right-container">
                    <div id="form-count">{`${currentStep}/${totalSteps}`}</div>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Mainlayout;

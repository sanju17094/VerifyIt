import React from 'react';
import Header from '../components/Navbar';
import BasicDetailsForm from '../Forms/BasicDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './Mainlayout.css';
import ProfessionalDetails from '../Forms/ProfessionalDetails';

function Mainlayout() {
    return (
        <>
            <Header />
            <div className="main-container">
                <div className="left-container">
                <h5>Personal Details</h5>
                <p>Let's get you started!</p>
                <h5>Professional Details</h5>
                <p>Fill up your past experiences</p>
                <h5>Educational Details</h5>
                <p>Provide details about your degree</p>
                <h5>All Done!</h5>
                <p>All done,let's go!</p>
                </div>
                {/* <div className='circle-check'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                </div> */}
                <div className="right-container">
                <BasicDetailsForm />
                </div>
            </div>
        </>
    );
}

export default Mainlayout;

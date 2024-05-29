import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './FormStyle.css';
import ProfessionalDetailsForm from './ProfessionalDetailsForm';

const ProfessionalDetails = () => {
  const [professionalDetails, setProfessionalDetails] = useState([
    {
      companyName: "",
      jobTitle: "",
      location: "",
      positionType: "",
      companySector: "",
      startTime: "",
      endTime: "",
      salary: "",
      moreDetails: "",
    }
  ]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...professionalDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setProfessionalDetails(updatedDetails);

    setErrors({
      ...errors,
      [`${name}${index}`]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
  };

  const addProfessionalDetail = () => {
    setProfessionalDetails([
      ...professionalDetails,
      {
        companyName: "",
        jobTitle: "",
        location: "",
        positionType: "",
        companySector: "",
        startTime: "",
        endTime: "",
        salary: "",
        moreDetails: "",
      }
    ]);
  };

  const removeProfessionalDetail = (index) => {
    const updatedDetails = professionalDetails.filter((_, i) => i !== index);
    setProfessionalDetails(updatedDetails);
  };

  const handleNext = () => {
    navigate('/educational_details');
  };

  return (
    <>
      <h3 className="mb-4 title">Professional Details</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          {professionalDetails.map((detail, index) => (
            <ProfessionalDetailsForm
              key={index}
              index={index}
              formData={detail}
              handleChange={handleChange}
              removeProfessionalDetail={removeProfessionalDetail}
              errors={errors}
            />
          ))}
          <div className='plus'>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={addProfessionalDetail}
              className='add-icon'
            />
          </div>
          <div className="ButtonsContainer d-flex justify-content-start">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>

            <button
              type="submit"
              className="submit-button"
              onClick={handleNext}
            >
              Save and Next
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ProfessionalDetails;

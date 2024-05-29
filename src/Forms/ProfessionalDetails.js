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
          <button
  type="button"
  className="custom-button"
  onClick={addProfessionalDetail}
>
  <span className="plus-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M10.8 2.452a1.3 1.3 0 10-2.6 0v5.316H2.885a1.3 1.3 0 000 2.6H8.2v5.315a1.3 1.3 0 002.6 0v-5.315h5.315a1.3 1.3 0 100-2.6H10.8V2.452z"
        clipRule="evenodd"
      ></path>
    </svg>
  </span>
  Professional Details
</button>
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

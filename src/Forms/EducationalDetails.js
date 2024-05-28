import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FormStyle.css';
import EducationDetailForm from './EducationalDetailsForm';

const EducationalDetails = () => {
  const [educationDetails, setEducationDetails] = useState([
    {
      program: "",
      school_college_name: "",
      board_university: "",
      score: "",
      scoreType: "",
      start_date: "",
      end_date: "",
      branch_specialization: ""
    }
  ]);

  const [errors, setErrors] = useState({});

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...educationDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setEducationDetails(updatedDetails);

    setErrors({
      ...errors,
      [`${name}${index}`]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
  };

  const addEducationDetail = () => {
    setEducationDetails([
      ...educationDetails,
      {
        program: "",
        school_college_name: "",
        board_university: "",
        score: "",
        scoreType:"",
        start_date: "",
        end_date: "",
        branch_specialization: ""
      }
    ]);
  };

  const removeEducationDetail = (index) => {
    const updatedDetails = educationDetails.filter((_, i) => i !== index);
    setEducationDetails(updatedDetails);
  };

  return (
    <>
      <h3 className="mb-4 title">Educational Details</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          {educationDetails.map((detail, index) => (
            <EducationDetailForm
              key={index}
              index={index}
              formData={detail}
              handleChange={handleChange}
              removeEducationDetail={removeEducationDetail} 
              errors={errors}
            />
          ))}
          <div className='plus'>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={addEducationDetail}
              className='add-icon'
            />
          </div>
          <button
            type="button"
            className="cancel-button"
          >
            Go Back
          </button>
          <button className="submit-button" type="submit">
            Save and Next
          </button>
        </Form>
      </Container>
    </>
  );
};

export default EducationalDetails;

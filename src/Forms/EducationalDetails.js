import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import EducationDetailForm from './EducationalDetailsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Style.css';

const EducationalDetails = () => {
  const [educationDetails, setEducationDetails] = useState([
    {
      program: "",
      school_college_name: "",
      board_university: "",
      score: "",
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
        start_date: "",
        end_date: "",
        branch_specialization: ""
      }
    ]);
  };

  return (
    <Container>
      <h3 className="mb-4 title">Educational Details</h3>
      <Form onSubmit={handleSubmit}>
        {educationDetails.map((detail, index) => (
          <EducationDetailForm
            key={index}
            index={index}
            formData={detail}
            handleChange={handleChange}
            errors={errors}
          />
        ))}
        <div className='plus'>
      <FontAwesomeIcon 
        icon={faPlus} 
        onClick={addEducationDetail} 
      />
    </div>
        {/* <button variant="primary" onClick={addEducationDetail} className="mb-3">
          Add More
        </button> */}

        <button variant="success" type="submit">
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default EducationalDetails;

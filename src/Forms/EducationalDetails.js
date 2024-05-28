import React, { useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import EducationDetailForm from './EducationalDetailsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FormStyle.css';
import axios from "axios";

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

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    
    try {
      // Post data to the API
      const response = await axios.post('http://localhost:8000/api/v1/Verifyit/education/add', {
        education: educationDetails,
        user_id: '664cd36d563acb8deb2a9a16' // Hardcoded user ID
      });

      console.log(response.data); // Log the response
    } catch (error) {
      console.error('Error:', error);
    }
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
            errors={errors}
          />
        ))}
        <div className='plus'>
      <FontAwesomeIcon 
        icon={faPlus} 
        onClick={addEducationDetail} 
      />
    </div>
        <button variant="success" type="submit">
          Submit
        </button>
      </Form>
    </Container>
    </>
  );
};

export default EducationalDetails;

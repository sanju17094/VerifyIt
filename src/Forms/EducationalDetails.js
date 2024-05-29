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
       <button
  type="button"
  className="custom-button"
  onClick={addEducationDetail}
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
  Education Details
</button>
        <button variant="success" type="submit">
          Submit
        </button>
      </Form>
    </Container>
    </>
  );
};

export default EducationalDetails;

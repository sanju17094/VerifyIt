import React, { useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import EducationDetailForm from './EducationalDetailsForm';
import './FormStyle.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EducationalDetails = () => {
  const [educationDetails, setEducationDetails] = useState([
    {
      program: "",
      school_college_name: "",
      board_university: "",
      scoreType: "",
      score: "",
      start_date: "",
      end_date: "",
      branch_specialization: ""
    }
  ]);

  const [errors, setErrors] = useState({});
  const educationDoc = ['high','inter','graduate','postgraduate','phd'];
const navigate = useNavigate();
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

  
  let index;
  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);
  console.log("map1 ka data", map1);
  if (Array.isArray(sequenceArray)) {
    index = sequenceArray.indexOf("Educational Details");
  } else {
    console.error("sequenceArrayData is not a valid array");
  }
  console.log("index of Educational Details:", index);

  const handleNext = () => {
     const documentUpload = JSON.parse(localStorage.getItem("documentUpload"));
     const size = educationDetails.length;
     const updatedDocumentUpload = documentUpload.concat(
       educationDoc.slice(0, size)
     );
     localStorage.setItem(
       "documentUpload",
       JSON.stringify(updatedDocumentUpload)
     );
    const nextPage = sequenceArray[index + 1];
    console.log("nextPage ki value", nextPage);
    const link = map1.get(nextPage);
    console.log("link next page ki", link);
    navigate(`/${link}`);
  };
 

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    
    try {
      // Post data to the API
      const response = await axios.post('http://localhost:8000/api/v1/Verifyit/education/add', {
        education: educationDetails,
        user_id: '664cd36d563acb8deb2a9a16' // Hardcoded user ID
      });
handleNext();

      console.log(response.data); // Log the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addEducationDetail = () => {
    if (educationDetails.length>=4){
       alert("You can add only 4 eductional details");
    }else{
 setEducationDetails([
   ...educationDetails,
   {
     program: "",
     school_college_name: "",
     board_university: "",
     scoreType: "",
     score: "",
     start_date: "",
     end_date: "",
     branch_specialization: "",
   },
 ]);
    }
     
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19 19"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.8 2.452a1.3 1.3 0 10-2.6 0v5.316H2.885a1.3 1.3 0 000 2.6H8.2v5.315a1.3 1.3 0 002.6 0v-5.315h5.315a1.3 1.3 0 100-2.6H10.8V2.452z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            Education Details
          </button>

          {index !== 0 && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          )}
          <button type="button" className="submit-button" onClick={handleNext}>
            Save and Next
          </button>
        </Form>
      </Container>
    </>
  );
};

export default EducationalDetails;

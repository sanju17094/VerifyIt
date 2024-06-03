import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import EducationDetailForm from "./EducationalDetailsForm";
import "./FormStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const EducationalDetails = () => {
  const [educationDetails, setEducationDetails] = useState([
    {
      program: "",
      school_college_name: "",
      board_university: "",
      score: "",
      score_type: "",
      start_date: "",
      end_date: "",
      branch_specialization: "",
    },
  ]);

  const [errors, setErrors] = useState({});
  const educationDoc = ["high", "inter", "graduate", "postgraduate", "phd"];
  const navigate = useNavigate();

  // Retrieve and decode the token from local storage
  const token = localStorage.getItem("token");
  let user_id = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user_id = decodedToken.userID;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    async function setField() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/Verifyit/education-details/get-id/${user_id}`
        );
        const result = await response.json();
        if (!result.success) {
          return;
        }
        console.log("result ka data ", result);

        const data = result.data.education;

        const formattedData = data.map((item) => ({
          program: item.program,
          school_college_name: item.school_college_name,
          board_university: item.board_university,
          score: item.score,
          score_type: item.score_type,
          start_date: new Date(item.start_date).toISOString().split("T")[0],
          end_date: new Date(item.end_date).toISOString().split("T")[0],
          branch_specialization: item.branch_specialization,
        }));

        setEducationDetails(formattedData);
      } catch (error) {
        console.error("Error fetching education details: ", error);
      }
    }
    setField();
  }, [user_id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...educationDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setEducationDetails(updatedDetails);
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}${index}`]: error,
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    if (
      name === "program" ||
      name === "school_college_name" ||
      name === "board_university" ||
      name === "score" ||
      name === "score_type" ||
      name === "start_date" ||
      name === "end_date"
    ) {
      if (!value.trim()) {
        error = "This field is required";
      }
    }
    return error;
  };

  let pageIndex;
  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);
  console.log("map1 ka data", map1);
  if (Array.isArray(sequenceArray)) {
    pageIndex = sequenceArray.indexOf("Educational Details");
  } else {
    console.error("sequenceArrayData is not a valid array");
  }
  console.log("index of Educational Details:", pageIndex);

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
    const nextPage = sequenceArray[pageIndex + 1];
    console.log("nextPage ki value", nextPage);
    const link = map1.get(nextPage);
    console.log("link next page ki", link);
    navigate(`/${link}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation before submission
    const newErrors = {};
    educationDetails.forEach((detail, index) => {
      Object.keys(detail).forEach((key) => {
        const error = validateField(key, detail[key]);
        if (error) {
          newErrors[`${key}${index}`] = error;
        }
      });
    });
    setErrors(newErrors);

    // Check if there are any errors, and if not, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/Verifyit/education/add",
          {
            education: educationDetails,
            user_id: user_id,
          }
        );

        console.log(response.data); // Log the response
        handleNext(); // Navigate to the next page only after a successful API call
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const addEducationDetail = () => {
    if (educationDetails.length >= 4) {
      alert("You can add only 4 educational details");
    } else {
      setEducationDetails([
        ...educationDetails,
        {
          program: "",
          school_college_name: "",
          board_university: "",
          score: "",
          score_type: "",
          start_date: "",
          end_date: "",
          branch_specialization: "",
        },
      ]);
    }
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

          {pageIndex !== 0 && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          )}
          <button type="submit" className="submit-button">
            Save and Next
          </button>
        </Form>
      </Container>
    </>
  );
};

export default EducationalDetails;

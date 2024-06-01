import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./FormStyle.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use the correct import
import axios from "axios";

const PersonalDetails = () => {
  const navigate = useNavigate();

  // Retrieve and decode the token from local storage
  const token = localStorage.getItem("token");
  let userData = {};
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userData = decodedToken; // Assuming the payload contains the user data
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }


  const [formData, setFormData] = useState({
    user_id: userData.userID,
    firstName: userData.first_name || "",
    lastName: userData.last_name || "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: userData.mobile || "",
    email: userData.email || "",
    gender: "",
    idProofType: "",
    idProofNum: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(()=>{
    async function setField(){
const response = await fetch(
  `http://localhost:8000/api/v1/Verifyit/personal-details/get-id/${userData.userID}`
);

const result = await response.json();
if(!result.success){
  return;
}
console.log("result ka data ", result);
const data=result.personalDetails;
let dateObj;
if(data.dob){
   dateObj = new Date(data.dob).toISOString().split("T")[0];
}

setFormData({
  dob: dateObj || "",
  address: data.location.address || "",
  city: data.location.city || "",
  state: data.location.state || "",
  country: data.location.country || "",
  zipcode: data.location.zipcode || "",

  gender: data.gender || "",
  idProofType: data.idProof || "",
  idProofNum: data.idProofNumber || "",
});

    }
    setField();
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the validation error for the field when it's being filled
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  let index;
  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);
  console.log("map1 ka data", map1);
  if (Array.isArray(sequenceArray)) {
    index = sequenceArray.indexOf("Personal Details");
  } else {
    console.error("sequenceArrayData is not a valid array");
  }
  console.log("index of Personal Details:", index);

  const handleNext = () => {
    const documentUpload = JSON.parse(localStorage.getItem("documentUpload"));
    if (!documentUpload.includes("profile")) {
      documentUpload.push("profile");
      documentUpload.push(formData.idProofType);
      localStorage.setItem("documentUpload", JSON.stringify(documentUpload));
    }
    const nextPage = sequenceArray[index + 1];
    console.log("nextPage ki value", nextPage);
    const link = map1.get(nextPage);
    console.log("link next page ki", link);
    navigate(`/${link}`);
  };

  const handleSubmit = async () => {
    const requestBody = {
      user_id: userData.userID, // Assuming the user_id is present in the token payload
      gender: formData.gender,
      dob: formData.dob,
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipcode: formData.zipcode,
      },
      idProof: formData.idProofType,
      idProofNumber: formData.idProofNum,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/Verifyit/personal-details/create",
        requestBody
      );
      console.log("API Response:", response.data);
      handleNext(); // Navigate to the next page only after a successful API call
    } catch (error) {
      console.error("API Error:", error);
      // Handle API error here if needed
    }
  };

  return (
    <>
      <h3 className="mb-4 title">Personal Details</h3>
      <Container>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>
                  First Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                  disabled
                  className="disabled-field"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>
                  Last Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                  disabled
                  className="disabled-field"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select Date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <div className="custom-dropdown">
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      height: "auto",
                      marginTop: "5px",
                      marginBottom: "15px",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <span className="dropdown-arrow">&#9662;</span>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                  disabled
                  className="disabled-field"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMobile">
                <Form.Label>
                  Mobile Number<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                  disabled
                  className="disabled-field"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  isInvalid={!!errors.country}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formZipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Zip Code"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  isInvalid={!!errors.zipcode}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formIdProofType">
                <Form.Label>ID Proof Type</Form.Label>
                <Form.Control
                  as="select"
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  isInvalid={!!errors.idProofType}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                >
                  <option value="">Select ID Proof Type</option>
                  <option value="aadhar_card">Aadhar Card</option>
                  <option value="pan_card">PAN Card</option>
                  <option value="voter_id">Voter ID</option>
                  <option value="passport">Passport</option>
                  <option value="licence">Licence</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.idProofType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formIdProofNum">
                <Form.Label>ID Proof Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID Proof Number"
                  name="idProofNum"
                  value={formData.idProofNum}
                  onChange={handleChange}
                  isInvalid={!!errors.idProofNum}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idProofNum}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {index !== 0 && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          )}
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            Save and Next
          </button>
        </Form>
      </Container>
    </>
  );
};

export default PersonalDetails;

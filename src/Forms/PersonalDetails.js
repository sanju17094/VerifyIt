import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import './FormStyle.css';
// import Swal from "sweetalert2";
// import { API_URL } from '../ApiUrl';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    email: "",
    idProofType: "",
    idProofNum: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate form fields
  //   const validationErrors = {};
  //   if (!formData.first_name.trim()) {
  //     validationErrors.first_name = "First name is required";
  //   }
  //   if (!formData.last_name.trim()) {
  //     validationErrors.last_name = "Last name is required";
  //   }
  //   if (
  //     !formData.mobile.trim() ||
  //     formData.mobile.trim().length !== 10 ||
  //     !/^\d+$/.test(formData.mobile)
  //   ) {
  //     validationErrors.mobile = "Mobile number must be a 10-digit number";
  //   }
  //   if (!formData.role.trim()) {
  //     validationErrors.role = "Role is required";
  //   }

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/super-admin/add-user`,
  //       formData
  //     );
  //     console.log(response);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success!",
  //       text: "User added successfully",

  //     }).then(() => {
  //       navigate('/users');
  //     })
  //   } catch (error) {
  //     console.error("Error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Validation Error",
  //       text: "Number Already Exist",
  //     });
  //   }
  // };



  const handleNext = () => {
    navigate('/professional_details');
  };


  return (
    <>
      <h3 className="mb-4 title">Personal Details</h3>
      <Container>
        <Form >
          <Row>
            <Col md={4}>
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
                  isInvalid={!!errors.first_name}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formMiddleName">
                <Form.Label>
                  Middle Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  isInvalid={!!errors.middleName}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.middleName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
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
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
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

            <Col md={4}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <div className="custom-dropdown">
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{ height: "auto" }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  {/* Add feedback for validation if needed */}
                  {/* <Form.Control.Feedback type="invalid">
                 {errors.gender}
                 </Form.Control.Feedback> */}
                  <span className="dropdown-arrow">&#9662;</span>{" "}
                  {/* Downward arrow */}
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="formMobile">
                <Form.Label>
                  Mobile Number<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  isInvalid={!!errors.mobile}
                  style={{ marginTop: "5px", marginBottom: "4px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4}>
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

            <Col md={4}>
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


            <Col md={4}>
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
          </Row>

          <Row>
            <Col md={4}>
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
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.idProofType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formIdProofFile">
                <Form.Label>ID Proof Number</Form.Label>
                <Form.Control
                  type="num"
                  name="idProofNum"
                  isInvalid={!!errors.idProofNum}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idProofNum}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>


          <button
            type="button"
            className="cancel-button"
          >
            Go Back
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleNext}
          >
            Save and Next
          </button>
        </Form>
      </Container>
    </>
  );
};

export default PersonalDetails;

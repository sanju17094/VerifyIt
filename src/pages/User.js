import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/User.css";
import Swal from "sweetalert2";

const User = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.first_name.trim()) {
      validationErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      validationErrors.last_name = "Last name is required";
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length !== 10 || !/^\d+$/.test(formData.mobile)) {
      validationErrors.mobile = "Mobile number must be a 10-digit number";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      validationErrors.email = "Email is required and must be a valid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/kheloindore/super-admin/add-user", formData);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration successful",
      });
      // Clear form data after successful registration
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        role: "",
      });
      // Clear errors
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to register",
      });
    }
  };
  const handleCancel = () => {
    // Clear form data
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      role: "",
    });
    // Clear errors
    setErrors({});
  };

  return (
    <>
  <h3>Registration</h3>
  <Container style={{ maxWidth: '1500px', boxShadow: '6px 0px 10px -4px rgba(0,0,0,0.75)', marginBottom: '20px', marginTop: '50px' }}>
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* First Name and Last Name in one row */}
        <Col md={6}>
          <Form.Group controlId="formFirstName">
            <Form.Label>
              First Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
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
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Email and Mobile in one row */}
        <Col md={6}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Role in one row */}
        <Col md={6}>
        <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <div className="custom-dropdown">
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{ height: 'auto' }} // Adjust the height of the select element
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Coach">Coach</option>
                <option value="Venue Admin">Venue Admin</option>
                <option value="Super Admin">Super Admin</option>
                {/* <option value="vendor">Vendor</option> */}
              </Form.Control>
              <span className="dropdown-arrow">&#9662;</span> {/* Downward arrow */}
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <Row style={{ marginTop: '20px', marginLeft: '0px' }}>
        <Col md={12}>
          <div className="ButtonsContainer d-flex justify-content-start"> {/* Align buttons to the left */}
            <Button type="submit" className="submit-button" style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Button type="button" className="cancel-button" onClick={handleCancel} style={{ backgroundColor: '#303030', color: '#fff' }}>
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  </Container>
</>



  );
};

export default User;

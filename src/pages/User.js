import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/User.css";
import Swal from "sweetalert2";

const VenueBooking = () => {
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
    if (
      !formData.mobile.trim() ||
      formData.mobile.trim().length !== 10 ||
      !/^\d+$/.test(formData.mobile)
    ) {
      validationErrors.mobile = "Mobile number must be a 10-digit number";
    }
    if (!formData.role.trim()) {
      validationErrors.role = "Role is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/kheloindore/super-admin/add-user",
        formData
      );
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
        title: "Validation Error",
        text: "Number Already Exist",
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
      <h3
        className="mb-4 title"
        style={{ marginTop: "40px", marginBottom: "10px" }}
      >
        Registration
      </h3>
      <Container
        style={{
          maxWidth: "1000px",
          boxShadow: "6px 0px 1px -8px rgba(0,0,0,0.75)",
          marginBottom: "20px",
          marginTop: "30px",
          marginRight: "400px",
        }}
      >
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
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
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
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  isInvalid={!!errors.last_name}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
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
                  style={{ marginTop: "5px", marginBottom: "15px" }}
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
          </Row>

          <Row>
            {/* Role in one row */}
            <Col md={6}>
              <Form.Group controlId="formRole">
                <Form.Label>
                  Role<span className="text-danger">*</span>
                </Form.Label>
                <div className="custom-dropdown">
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                    style={{ height: "auto" }} // Adjust the height of the select element
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Coach">Coach</option>
                    <option value="Venue Admin">Venue Admin</option>
                    {/* <option value="Super Admin">Super Admin</option> */}
                    {/* <option value="vendor">Vendor</option> */}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                  <span className="dropdown-arrow">&#9662;</span>{" "}
                  {/* Downward arrow */}
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Buttons */}
          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                {" "}
                {/* Align buttons to the left */}
                <Button
                  type="submit"
                  className="submit-button"
                  style={{ marginRight: "10px" }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  style={{ backgroundColor: "#303030", color: "#fff" }}
                >
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

export default VenueBooking;

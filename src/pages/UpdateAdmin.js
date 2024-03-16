import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import '../../src/Adduser.css';

const UpdateAdmin = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
    status: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (isChecked) => {
    setFormData({
      ...formData,
      status: isChecked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.mobile || !formData.role) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/kheloindore/admin/create", formData);
      console.log(response.data);
      alert("Admin added successfully");
    } catch (error) {
      alert("Failed to add Admin");
      console.error("Error:", error);
    }
    console.log("hii");
  };

  const handleCancel = () => {
    setFormData({
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
      role: "",
      status: ""
    });
  };

  return (
    <>
    <h3>Admin Update</h3>
    <Container className="adduser">
          <Row className="Form-row">
        <Col md={4}>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name
              <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>


          

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address
              <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name  
              <span className="StarSymbol">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password
              <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number
              <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAdminRole">
              <Form.Label>Admin Role
              <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Super Admin</option>
                <option value="user">Admin</option>
                <option value="user">Vender</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group controlId="formStatus">
            <Form.Check
              type="checkbox"
              label="Status"
              checked={formData.status}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="StatusCheckbox"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
      <div className="ButtonsContainer">
          <button type="button" className="btn btn-yellow" onClick={handleSubmit}>
            Update
          </button>{" "}
          <button type="button" className="btn btn-dark" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Row>
    </Container>
    </>
  );
};

export default UpdateAdmin;

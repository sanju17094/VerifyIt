import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import '../../src/Adduser.css';
import Swal from "sweetalert2";
import {Link} from "react-router-dom"

const AdminCreate = () => {
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


    if (!formData.first_name) {
      showAlert("First Name");
      return;
    }
    if (!formData.last_name) {
      showAlert("Last Name");
      return;
    }
    if (!formData.mobile) {
      showAlert("Mobile Number");
      return;
    }
    if (!formData.email) {
      showAlert("Email Address");
      return;
    }
    if (!formData.password) {
      showAlert("Password");
      return;
    }
    if (!formData.role) {
      showAlert("Admin Role");
      return;
    }

   
    try {
      const response = await axios.post("http://localhost:4000/api/v1/kheloindore/admin/create", formData);
      console.log(response.data);
      alert("Admin added successfully");
      window.location.href = "/Adminlist";
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


  const showAlert = (fieldName) => {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: `Please fill out the field: ${fieldName}`,
    });
  };

  return (
    <>
    <Container className="adduser" style={{ marginTop: '20px' }}>
      <Row className="Form-row" style={{ marginBottom: '20px' }}>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label className="heading">First Name
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
          </Form>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formLastName">
              <Form.Label className="heading">Last Name  
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
          </Form>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formMobileNumber">
              <Form.Label className="heading">Mobile Number
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
          </Form>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col md={4}>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label className="heading">Email Address
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
            <Form.Group controlId="formPassword">
              <Form.Label className="heading">Password
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
            <Form.Group controlId="formAdminRole">
              <Form.Label className="heading">Admin Role
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
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Vendor">Vender</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
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
          <button type="button" className="btn btn-yellow mx-2" onClick={handleSubmit}>
            Submit
          </button>
          <Link to="/Adminlist">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Link>
        </div>
      </Row>
    </Container>
    </>
  );
};

export default AdminCreate;

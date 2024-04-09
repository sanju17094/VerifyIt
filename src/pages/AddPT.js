import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/PT.css";
import Swal from "sweetalert2";
import { Link ,useNavigate} from "react-router-dom";
import { API_URL } from '../ApiUrl';

const User = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainer_name: "",
    duration: "",
    focus_area: "",
    price: "",
    mobile: "",
    status: false, // Add status field with initial value as false
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

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      status: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.trainer_name.trim()) {
      validationErrors.trainer_name = "Trainer name is required";
    }
    if (!formData.duration.trim()) {
      validationErrors.duration = "Duration is required";
    }
    if (!formData.focus_area.trim()) {
      validationErrors.focus_area = "Focus area is required";
    }
    if (!formData.price.trim()) {
      validationErrors.price = "Price is required";
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length !== 10 || !/^\d+$/.test(formData.mobile)) {
      validationErrors.mobile = "Mobile number must be a 10-digit number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("${API_URL}/PersonalTraining/create", formData);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Trainer Added",
      });
      navigate("/personal-training")
      // Clear form data after successful registration
      setFormData({
        trainer_name: "",
        duration: "",
        focus_area: "",
        price: "",
        mobile: "",
        status: false,
      });
      // Clear errors
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add",
      });
    }
  };

  const handleCancel = () => {
    // Clear form data
    setFormData({
      trainer_name: "",
      duration: "",
      focus_area: "",
      price: "",
      mobile: "",
      status: false,
    });
    // Clear errors
    setErrors({});
  };

  return (
    <>
      <h3 className="mb-4 title">Personal Trainer</h3>
      <Container style={{ maxWidth: '1500px', boxShadow: '6px 0px 10px -4px rgba(0,0,0,0.75)', marginBottom: '20px', marginTop: '50px' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Trainer Name */}
            <Col md={6}>
              <Form.Group controlId="formTrainerName">
                <Form.Label>
                  Trainer Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Trainer Name"
                  name="trainer_name"
                  value={formData.trainer_name}
                  onChange={handleChange}
                  isInvalid={!!errors.trainer_name}
                />
                <Form.Control.Feedback type="invalid">{errors.trainer_name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* Duration */}
            <Col md={6}>
              <Form.Group controlId="formDuration">
                <Form.Label>
                  Duration<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  isInvalid={!!errors.duration}
                />
                <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
              </Form.Group><br></br>
            </Col>
          </Row>

          {/* Focus Area */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFocusArea">
                <Form.Label>
                  Focus Area<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Focus Area"
                  name="focus_area"
                  value={formData.focus_area}
                  onChange={handleChange}
                  isInvalid={!!errors.focus_area}
                />
                <Form.Control.Feedback type="invalid">{errors.focus_area}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* Price */}
            <Col md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label>
                  Price<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group><br></br>
            </Col>
          </Row>

          {/* Mobile */}
          <Row>
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

          {/* Status Checkbox */}
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

          {/* Buttons */}
          <Row style={{ marginTop: '20px', marginLeft: '0px' }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start"> {/* Align buttons to the left */}
              
                <Button type="submit" className="submit-button" style={{ marginRight: '10px' }}>
                  Submit
                </Button>
                <Link to= "/personal-training" >
                <Button type="button" className="cancel-button" onClick={handleCancel} style={{ backgroundColor: '#303030', color: '#fff' }}>
                  Cancel
                </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default User;

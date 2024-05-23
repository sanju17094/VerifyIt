import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import './FormStyle.css';
import { useNavigate } from 'react-router-dom';

const ProfessionalDetails = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    positionType: "",
    companySector: "",
    startTime: "",
    endTime: "",
    salary: "",
    moreDetails: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleNext = () => {
    navigate('/educational_details');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
  };

  return (
    <>
      <h3 className="mb-4 title">Professional Details</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  isInvalid={!!errors.jobTitle}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobTitle}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="formPositionType">
                <Form.Label>Position Type</Form.Label>
                <Form.Control
                  as="select"
                  name="positionType"
                  value={formData.positionType}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                >
                  <option value="">Select Position Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formCompanySector">
                <Form.Label>Company Sector</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Sector"
                  name="companySector"
                  value={formData.companySector}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="date"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="date"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formMoreDetails">
                <Form.Label>More Details</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter More Details"
                  name="moreDetails"
                  value={formData.moreDetails}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                <button
                  type="button"
                  className="cancel-button"
                >
                  Go Back
                </button>

                <button
                  type="submit"
                  className="submit-button"
                  onClick={handleNext}
                >
                  Save and Next
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProfessionalDetails;

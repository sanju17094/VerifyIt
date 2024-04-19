import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../ApiUrl";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    status: true,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.event_name.trim()) {
      validationErrors.event_name = "Event name is required";
    }
    if (!formData.start_date.trim()) {
      validationErrors.start_date = "Start date is required";
    }
    if (!formData.end_date.trim()) {
      validationErrors.end_date = "End date is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/event/create`, formData);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Event added successfully",
      }).then(() => {
        navigate("/events");
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add event. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    // Clear form data
    setFormData({
      event_name: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      status: ""
    });
    // Clear errors
    setErrors({});
  };

  return (
    <>
      <h3 className="mb-4 title">Event</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEventName">
                <Form.Label>
                  Event Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Event Name"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  isInvalid={!!errors.event_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.event_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Form.Group><br></br>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formStartDate">
                <Form.Label>
                  Start Date<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  isInvalid={!!errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEndDate">
                <Form.Label>
                  End Date<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  isInvalid={!!errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date}
                </Form.Control.Feedback>
              </Form.Group><br></br>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Form.Group controlId="formCheckbox">
              <div className="checkbox-container">
                <Form.Check
                  type="checkbox"
                  id="statusCheckbox"
                  name="status"
                  aria-label="option 1"
                  className="checkbox-input"
                  checked={formData.status || false}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.checked })
                  }
                />
              </div>
              <Form.Label className="checkbox-label">Status</Form.Label>
            </Form.Group>
          </Row>

          {/* Buttons */}
          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                {" "}
                {/* Align buttons to the left */}
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Col>


          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddEvent;

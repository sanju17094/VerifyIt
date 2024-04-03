import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/User.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../ApiUrl";

const UpdateEvent = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user data based on userId
    axios
      .get(`${API_URL}/event/get/${_id}`)
      .then((res) => {
        console.log(res.data, "Data.....-l-....--.hihgbu ");
        const {
          event_name,
          description,
          start_date,
          end_date,
          location,
          status,
        } = res.data;
        setFormData({
          event_name: res.data.event_name,
          description: res.data.description,
          start_date: res.data.start_date,
          end_date: res.data.end_date,
          location: res.data.location,
          status: res.data.status,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [_id]);

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

    // Validate each field
    const { first_name, last_name, email, mobile, role } = formData;
    if (!first_name || !last_name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Update the field",
      });
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/super-admin/update-user/${_id}`,
        formData
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully",
      });
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
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
      <h3 className="mb-4 title">Update Event</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEventName">
                <Form.Label>
                   Event Title<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Event Title"
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
              </Form.Group>
            </Col>
          </Row>

          <Row>
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
              </Form.Group>
            </Col>
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

export default UpdateEvent;

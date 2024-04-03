import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { StateSelect, CitySelect } from "react-country-state-city";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { API_URL } from '../ApiUrl';
import '../Coaches.css';

const Coaches = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    experience: "",
    availability: "",
    specializations: [],
    bio: "",
    venue_rules: "",
  });

  useEffect(() => {
    setCountryid(101);
  }, []);

  const navigate = useNavigate();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is within the location object, handle it separately
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1]; // Extract the field name from the input name
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value, // Update the specific field within the location object
        },
      });
    } else {
      // If it's a regular field, update the state as before
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    console.log("Form Data Updated:", formData);
  };

  const handleCancel = () => {
    navigate("/coaches");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${API_URL}/create-coach`, formData);
      console.log("API Response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Form Submitted!",
        text: "Your form data has been submitted successfully.",
      }).then((result) => {
        navigate("/coaches");
      });
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit form. Please try again later.",
      });
    }
  };

  return (
    <>
      <h3 className="mb-4 title">Coach</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={4}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <h6>State</h6>
              <StateSelect
                countryid={countryid}
                value={formData.location.state}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.id },
                  });
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              />
              <h6>City</h6>
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                value={formData.location.city}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.id },
                  });
                }}
                placeHolder="Select City"
              />
            </Col>

            <Col sm={4}>
              <Form.Group controlId="formZipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  name="location.zipCode"
                  value={formData.location.zipCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formExperience">
                <Form.Label>Experience (in years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Group controlId="formAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formSpecializations">
                <Form.Label>Specializations</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter specializations"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formVenueRules">
            <Form.Label>Venue Rules</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter venue rules"
              name="venue_rules"
              value={formData.venue_rules}
              onChange={handleChange}
            />
          </Form.Group>
          <button type="submit" className="SubmitButton">
            Submit
          </button>

          <button type="button" className="CancelButton" onClick={handleCancel}>
            Cancel
          </button>
        </Form>
      </Container>
    </>
  );
};

export default Coaches;

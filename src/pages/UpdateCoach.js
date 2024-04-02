import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { StateSelect, CitySelect } from "react-country-state-city";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { API_URL } from '../ApiUrl';
import '../Coaches.css'

const UpdateCoach = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // mobile: "",
    // location: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   zipCode: "",
    // },
    experience: "",
    availability: "",
    specializations: "",
    bio: "",
    venue_rules: "",
  });

  useEffect(() => {
    const fetchcoach = async () => {
      try {
        const response = await Axios.get(`${API_URL}/fetch-coach/${_id}`);
        const coach = response.data;
        console.log(response.data, "Data")
        setFormData({
          first_name: coach.coach.first_name,
          last_name: coach.coach.last_name,
          email: coach.coach.email,
          // mobile: coach.coach.mobile,
          // location: {
          //   address: coach.coach.location.address,
          //   city: coach.coach.location.city,
          //   state: coach.coach.location.state,
          //   zipCode: coach.coach.location.zipCode,
          // },
          experience: coach.coach.experience,
          availability: coach.coach.availability,
          specializations: coach.coach.specializations.join(', '),
          bio: coach.coach.bio,
          venue_rules: coach.coach.venue_rules,
        });
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };

    fetchcoach();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("Form Data Updated:", formData);
  };

  // const handleStateChange = (state) => {
  //   setFormData({
  //     ...formData,
  //     location: {
  //       ...formData.location,
  //       state: state,
  //     },
  //   });
  //   console.log("State Updated:", state);
  // };

  // const handleCityChange = (city) => {
  //   setFormData({
  //     ...formData,
  //     location: {
  //       ...formData.location,
  //       city: city,
  //     },
  //   });
  //   console.log("City Updated:", city);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(
        `${API_URL}/update-coach-super-admin/${_id}`,
        formData
      );
      console.log("API Response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Form Submitted!",
        text: "Your form data has been updated successfully.",
      }).then((result) => {
        navigate("/coaches");
      });
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update form. Please try again later.",
      });
    }
  };


  return (
    <>
    <h3 className="mb-4 title">Update Coach</h3>
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
          {/* <Col sm={4}>
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
          </Col> */}
          {/* <Col sm={4}>
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
          </Col> */}
          {/* <Col sm={4}>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <StateSelect
                value={formData.location.state}
                onChange={handleStateChange}
              />
            </Form.Group>
          </Col> */}
        </Row>
        <Row>
          {/* <Col sm={4}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <CitySelect
                country="United States"
                state={formData.location.state}
                value={formData.location.city}
                onChange={handleCityChange}
              />
            </Form.Group>
          </Col> */}
          {/* <Col sm={4}>
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
          </Col> */}
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
          <Form.Group controlId="formExperience">
              <Form.Label>Experience(in years)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

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

        </Row>
        <Row>
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
        <button type="submit" className="SubmitButton">
          Update
        </button>
      </Form>
    </Container>
    </>
  );
};

export default UpdateCoach;

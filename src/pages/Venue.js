import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "../src/venue.css";
import { Link } from 'react-router-dom';

const VenueBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/kheloindore/venue/add",
        formData
      );
      console.log(response.data);
      alert("Venue added successfully");
    } catch (error) {
      alert("Failed to add venue");
      console.error("Error:", error);
      window.location.href = "/VenueTable";
    }
    console.log("hii");

  };


  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Handle selected files here
  };

  return (
    <Container>
      <h3>Add Venue</h3>
      <hr></hr>
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Venue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Venue Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhotos">
  <Form.Label>Upload Photos</Form.Label>
  <Form.Control
    type="file"
    multiple // This attribute allows selecting multiple files
    name="photos"
    onChange={handlePhotoChange}
  />
</Form.Group>

          </Form>
        </Col>
        <Col md={4}>
          {/* Second column content can go here */}

          <Form.Group controlId="formName">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email "
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
  <Form.Label>Category</Form.Label>
  <Form.Select
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option value="">Select a category</option>
    <option value="Category 1">Category 1</option>
    <option value="Category 2">Category 2</option>
    <option value="Category 3">Category 3</option>
    {/* Add more options as needed */}
  </Form.Select>
</Form.Group>


        </Col>
        <Col md={4}>
          {/* Third column content can go here */}

          <Form.Group controlId="formLocation">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Zipcode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formsubCategory">
  <Form.Label>Sub Category</Form.Label>
  <Form.Select
    name="subcategory"
    value={formData.subcategory}
    onChange={handleChange}
  >
    <option value="">Select Sub category</option>
    <option value="Category 1">subCategory 1</option>
    <option value="Category 2">subCategory 2</option>
    <option value="Category 3">subCategory 3</option>
    {/* Add more options as needed */}
  </Form.Select>
</Form.Group>

        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "50px" }}>
        <Button variant="dark" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        
        </Col>
      </Row>
    </Container>
  );
};

export default VenueBooking;

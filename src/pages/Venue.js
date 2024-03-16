import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/Venue.css";
import Swal from "sweetalert2";

const VenueBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    location: "",
    photos: "",
    Category:"",
    SubCategory:"",

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
  
    // Check if any required fields are empty
    const requiredFields = {
      name: "Venue Name",
      email: "Email Address",
      phone: "Phone Number",
      address: "Address",
      city: "City",
      state: "State",
      country: "Country",
      location: "Location",
      zipCode: "Zipcode",
      // photos: "Photos",
      Category: "Category",
      SubCategory:"SubCategory",

    };
  
    const emptyFields = [];
    for (const field in requiredFields) {
      if (!formData[field]) {
        emptyFields.push(requiredFields[field]);
      }
    }
  
    if (emptyFields.length > 0) {
      const fieldToFill = emptyFields[0];
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: `Please fill out the required field: ${fieldToFill}`,
      });
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/kheloindore/venue/add",
        formData
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Venue added successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add venue",
      });
    }
  };



  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Handle selected files here
  };

  return (
    <>
    <h3>Add Venue</h3>
    <Container>
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label className="heading">
                Venue Name
                <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Venue Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="heading">
                Address
                <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="heading">
                Country
                <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhotos">
              <Form.Label className="heading">
                Upload Photos
                <span className="StarSymbol">*</span>
              </Form.Label>
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
            <Form.Label className="heading">
              Email Address
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email "
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label className="heading">
              City
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>

          
         <Form.Group controlId="formCategory">
            <Form.Label className="heading">
              Category
              <span className="StarSymbol">*</span>
            </Form.Label>
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

          <Form.Group controlId="formsubCategory">
            <Form.Label className="heading">
              Sub Category
              <span className="StarSymbol">*</span>
            </Form.Label>
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
        <Col md={4}>
          {/* Third column content can go here */}

          <Form.Group controlId="formLocation">
            <Form.Label className="heading">
              Phone Number
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label className="heading">
              State
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label className="heading">
              Zipcode
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Zipcode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Form.Group>

        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "50px" }}>
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default VenueBooking;

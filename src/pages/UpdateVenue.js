import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { API_URL } from '../ApiUrl';
import {
  CountrySelect,
  StateSelect,
  CitySelect,
  ZipCodeSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const UpdateVenue = () => {
  const { _id } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    zipCode: "",
    city: "",
  });

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const response = await axios.get(`${API_URL}/venue/individual/${_id}`);
      const venue = response.data;
      setFormData({
        name: venue.name,
        address: venue.address,
        state: venue.state,
        zipCode: venue.zipCode,
        city: venue.city,
      });
    } catch (error) {
      console.error("Error fetching venue data:", error);
    }
  };

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
      const response = await axios.put(
        `${API_URL}/venue/edit/${_id}`,
        formData
      );
      console.log("API Response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Venue updated successfully",
      });
    } catch (error) {
      console.error("Error updating venue:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update venue",
      });
    }
  };

  return (
    <>
      <h3>Update Venue</h3>
      <Container>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
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
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <StateSelect
                  value={formData.state}
                  onChange={(selectedState) =>
                    setFormData({ ...formData, state: selectedState })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <CitySelect
                  country="India" 
                  state={formData.state}
                  value={formData.city}
                  onChange={(selectedCity) =>
                    setFormData({ ...formData, city: selectedCity })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formZipCode">
                <Form.Label>Zip Code</Form.Label>
                <ZipCodeSelect
                  country="India" 
                  state={formData.state}
                  city={formData.city}
                  value={formData.zipCode}
                  onChange={(selectedZip) =>
                    setFormData({ ...formData, zipCode: selectedZip })
                  }
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update Venue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateVenue;
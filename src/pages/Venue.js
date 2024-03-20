
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/Venue.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';

const VenueBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    zipCode: "",
    city: "",
    images: "",
    Category: [],
    SubCategory: [],
    amenities: "",
    venuerules: "",

  });
  console.log(formData, "dfgdgfdf")
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    // Assuming you have a function to fetch subcategories without specifying a category ID
  }, []);
  console.log(formData, "fromdata value check")
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {

      const response = await axios.get(
        "http://localhost:4000/api/v1/kheloindore/category/fetch"
      );
      console.log(response.data.categories, "<response.data.categories")
      setCategories(response.data.categories);
      console.log(categories.category_name, "<category.category_name")
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const [subcategories, setSubcategories] = useState([]);
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/kheloindore/subcategory/fetch"
      );
      setSubcategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });



    // Update Category field
    if (name === "category") {
      setFormData({
        ...formData,
        Category: value
      });
    }
    // Update SubCategory field
    else if (name === "subcategory") {
      setFormData({
        ...formData,
        SubCategory: value
      });
    }
    // Update other fields
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    const requiredFields = {
      name: "Venue Name",
      email: "Email Address",
      phone: "Phone Number",
      address: "Address",
      state: "State",
      city: "city",
      zipCode: "Zipcode",
      Category: "Category",
      SubCategory: "SubCategory",

    };

    const emptyFields = [];
    for (const field in requiredFields) {
      if (!formData[field]) {
        emptyFields.push(requiredFields[field]);
      }
    }



    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/kheloindore/venue/addVenue",
        formData)

      console.log(response, "<,,,,,,,,,,responce");
      console.log(formData, "<formData")
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
                  Title
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>



              <Form.Group controlId="formAddress">
                <Form.Label className="heading">
                  City
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label className="heading">
                  Amenities
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label className="heading">
                  Venue Rules
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Venue Rules"
                  name="venuerules"
                  value={formData.venuerules}
                  onChange={handleChange}
                />
              </Form.Group>


              <Form.Group controlId="formCategory">
                <Form.Label className="heading">
                  Category <span className="StarSymbol">*</span>
                </Form.Label>
                <MultiSelect
                  name="category"
                  value={formData.category}
                  options={categories.map((category) => ({
                    label: category.category_name,
                    value: category._id,
                  }))}
                  onChange={(e) => setFormData({ ...formData, category: e.value })}
                  placeholder="Select categories"
                  className="multiselect-input" // Add a class for styling if needed
                />
              </Form.Group>


            </Form>
          </Col>
          <Col md={4}>
            {/* Second column content can go here */}

            <Form.Group controlId="formAddress">
              <Form.Label className="heading">
                Location
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

            <Form.Group controlId="formSubCategory">
              <Form.Label className="heading">
                Subcategory <span className="StarSymbol">*</span>
              </Form.Label>
              <MultiSelect
                name="subcategory"
                value={formData.SubCategory}
                options={subcategories.map((subcategory) => ({
                  label: subcategory.Subcategory_name,
                  value: subcategory._id,
                }))}
                onChange={(e) => setFormData({ ...formData, SubCategory: e.value })}
                placeholder="Select subcategories"
                className="multiselect-input" // Add a class for styling if needed
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            {/* Third column content can go here */}
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

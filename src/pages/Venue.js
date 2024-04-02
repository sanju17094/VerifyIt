import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import "../../src/Venue.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../ApiUrl';
import { useNavigate } from 'react-router-dom';

import {
  CountrySelect,
  StateSelect,
  CitySelect,
  ZipCodeSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const VenueBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    zipCode: "",
    city: "",
  });

  const amenitiesOptions = [
    { name: 'Select' },
    { name: 'Parking' },
    { name: 'Washroom' },
    { name: 'Drinking Water' },
    { name: 'Flood Lights' },
    { name: 'Artificial Turf' },
    { name: 'Seating Lounge' },
    { name: 'Changing Room' },
    { name: 'Power Backup' },
    { name: 'Open 24x7' },
    // Add more options as needed
  ];

  console.log(formData, "dfgdgfdf");
  useEffect(() => {
    fetchCategories();
    setCountryid(101);
    // fetchActivities();
  }, []);
  console.log(formData, "fromdata value check");


  const [categories, setCategories] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const [files, setFiles] = useState([]);
  const [timings, setTimings] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesOptions, setActivitiesOptions] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files];
    setFiles([...files, ...newFiles]);
  };

  const handlePhotoChange = (e) => {
    const newFiles = [...e.target.files];
    // Append new files to the existing files state
    setFiles([...files, ...newFiles]);
  
    // Update the formData state with the new files array
    setFormData({...formData, files: [...files, ...newFiles]});
  };
  

  const handleRemove = (index) => {
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleTimingsChange = (selectedTiming) => {
    setFormData({
      ...formData,
      timings: selectedTiming,
    });
  };

  const handleAmenitiesChange = (selectedList) => {
    setFormData({ ...formData, selectedAmenities: selectedList });
    // console.log(selectedList,"selected list")
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };


  const handleCancel = () => {
    navigate('/venues');
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/category/fetch`
      );
      console.log(response.data, "<response.data.categories");
      setCategories(response.data.categories);
      console.log(categories.category_name, "<category.category_name");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  // const fetchActivities = async () => {
  //   try {
  //     const response = await axios.get('${API_URL}/activity/fetch');
  //     setActivitiesOptions(response.data.activities);
  //     console.log(activities.activityName, "<activities.activityName");
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };




  // const handleActivitiesChange = (selectedOption) => {
  //   setSelectedActivities(selectedOption);
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Update Category field
    if (name === "category") {
      setFormData({
        ...formData,
        Category: value,
      });
    }

    // // Update other fields
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  function code4(event) {
    console.log("country code....", event);
    // setCountryid(e.id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    // const requiredFields = {
    //   name: "Venue Name",
    //   address: "Address",
    //   state: "State",
    //   city: "city",
    //   zipCode: "Zipcode",
    //   Category: "Category",
    // };



    // const emptyFields = [];
    // for (const field in requiredFields) {
    //   if (!formData[field]) {
    //     emptyFields.push(requiredFields[field]);
    //   }
    // }

    try {
      const response = await axios.post(
        `${API_URL}/venue/addVenue`,
        formData
      );
      console.log(response, "<,,,,,,,,,,responce");
      console.log(formData, "<formData");
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

  return (
    <>
      <h3>Venue</h3>
      <Container>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="heading">
                  Name
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

              {/* <Form.Group controlId="formName">
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
              </Form.Group> */}

              {/* <Form.Group controlId="formTimings">
                <Form.Label className="heading">
                  Timings
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <div className="select-wrapper">
                  <Dropdown onSelect={handleTimingsChange}>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {timings || 'Timings'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Before 6 AM">Before 6 AM</Dropdown.Item>
                      <Dropdown.Item eventKey="6 AM - 12 PM">6 AM - 12 PM</Dropdown.Item>
                      <Dropdown.Item eventKey="12 PM - 6 PM">12 PM - 6 PM</Dropdown.Item>
                      <Dropdown.Item eventKey="After 6 PM">After 6 PM</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Form.Group> */}

              <Form.Group controlId="formTimings">
                <Form.Label className="heading">
                  Amenities
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <div className="select-wrapper">
                  <Multiselect
                    options={amenitiesOptions}
                    displayValue="name"
                    selectedValues={selectedAmenities}
                    onSelect={handleAmenitiesChange}
                    onRemove={handleAmenitiesChange}
                    selectedAmenities={formData.amenities}
                    placeholder="Select Amenities"
                  />
                </div>
              </Form.Group>

              {/* <Form.Group controlId="formName">
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
              </Form.Group> */}

              <Form.Group controlId="formCategory">
                <Form.Label className="heading">
                  Category <span className="StarSymbol">*</span>
                </Form.Label>
                <Select
                  name="category"
                  value={formData.category}
                  options={categories.map((category) => ({
                    label: category.category_name,
                    value: category.category_name,
                  }))}
                  onChange={handleCategoryChange}
                  placeholder={`${formData.category || 'Select category'}`}
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

            {/* <Form.Group controlId="formActivities">
              <Form.Label className="heading">
                Activities
                <span className="StarSymbol">*</span>
              </Form.Label>
              <div className="select-wrapper">
                <Multiselect
                  options={activitiesOptions}
                  displayValue="name"
                  selectedValues={selectedActivities}
                  onSelect={handleActivitiesChange}
                  onRemove={handleActivitiesChange}
                  placeholder="Select Activities"
                />
              </div>
            </Form.Group> */}


          </Col>
          <Col md={4}>
            {/* Third column content can go here */}

            <h6>State</h6>
            <StateSelect
              countryid={countryid}
              value={formData.state}
              onChange={(e) => { setFormData({...formData,state:e.id})
                setstateid(e.id);
              }}
              placeHolder="Select State"

            />
            <h6>City</h6>
            <CitySelect
              countryid={countryid}
              stateid={stateid}
              value={formData.city}
              onChange={(e) => {  
                setFormData({...formData,city:e.id})
                // console.log(e);
              }}
              placeHolder="Select City"
            />

            <Form.Label className="heading">
              Upload Photos
              <span className="StarSymbol">*</span>
            </Form.Label>
            <Form.Group>
              <Form.Control
                type="file"
                multiple
                name="photos"
                onChange={handlePhotoChange}
                style={{ display: "none" }} // Hide the default file input
              />
              <div
                className="drag-drop-container"
                onClick={() => document.getElementsByName("photos")[0].click()}
                style={{ marginBottom: '10px' }} // Example inline CSS
              >
                <h3 style={{ fontSize: '18px' }}>
                  <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '5px' }} />
                  Drag & Drop here
                </h3>
                <button style={{ background: '#ff5f15', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>Select from files</button>
              </div>
              <div className="uploaded-files-container">
                {files.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <span>{file.name}</span>
                    <button onClick={() => handleRemove(index)}>Remove</button>
                  </div>
                ))}
              </div>
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
          <Col style={{ marginTop: "50px" }}>
            <button
              type="cancel"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VenueBooking;

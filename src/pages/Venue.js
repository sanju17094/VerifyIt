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
import { FiUpload, FiX } from 'react-icons/fi';

import {
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddVenue = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    images: [],
    amenities: "",
    activities: "",
    category: "",
    status: true,
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
  ];

  console.log(formData, "dfgdgfdf");
  useEffect(() => {
    console.log("UseEffect chal gya")
    fetchCategories();
    fetchActivities();
    setCountryid(101);
  }, []);
  console.log(formData, "fromdata value check");


  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [zipcode, setzipcode] = useState("");
  const [files, setFiles] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      images: files,
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };


  const handleAmenitiesChange = (selectedList) => {
    setFormData({ ...formData, amenities: selectedList });
    // console.log(selectedList,"selected list")
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleActivityChange = (selectedOption) => {
    setFormData({ ...formData, activities: selectedOption.value });
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


  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/activity/fetch`
      );
      console.log(response.data, "<response.data.activities");
      setActivities(response.data.activities);
      console.log(activities.activity_name, "< activity.activity_name");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Update Category field
    if (name === "category" || name === "activity") {
      setFormData({
        ...formData,
        category: value,
        activity: value,
      });
    }
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
    try {
      console.log("frontend se data..->", formData)
      await axios.post(
        `${API_URL}/venue/addVenue`,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      ).then((response) => {
        console.log(response.data, "ore response ")
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Venue added successfully",
          });

        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
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

              <Form.Group controlId="formTimings">
                <Form.Label className="heading">
                  Amenities
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <div className="select-wrapper">
                  <Multiselect
                    options={amenitiesOptions}
                    displayValue="name"
                    selectedValues={formData.amenities}
                    onSelect={handleAmenitiesChange}
                    onRemove={handleAmenitiesChange}
                    placeholder="Select Amenities"
                  />
                </div>
              </Form.Group>

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

            <Form.Group controlId="formLocation">
              <Form.Label className="heading">
                zipcode
                <span className="StarSymbol">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formActivity">
              <Form.Label className="heading">
                Activity <span className="StarSymbol">*</span>
              </Form.Label>
              <Select
                name="activity"
                value={formData.activities}
                options={activities.map((activity) => ({
                  label: activity.activity_name,
                  value: activity.activity_name,
                }))}
                onChange={handleActivityChange}
                placeholder={`${formData.activities || 'Select activity'}`}
              />
            </Form.Group>

          </Col>
          <Col md={4}>
            {/* Third column content can go here */}
            <h6>State</h6>
            <StateSelect
              countryid={countryid}
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.id })
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
                setFormData({ ...formData, city: e.id })
                // console.log(e);
              }}
              placeHolder="Select City"
            />
            <div className="mb-3">
              <h6 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Upload Photo</h6>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  setFormData(prevState => ({
                    ...prevState,
                    images: [...prevState.images, ...files.filter(file => file.type.startsWith('image/'))],
                  }));
                }}
                onDragOver={(e) => e.preventDefault()}
                style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '18px' }}>Drag & Drop here</h3>
                <div style={{ marginBottom: '10px' }}>
                  <FiUpload style={{ fontSize: '48px', marginBottom: '10px' }} />
                  <input type="file" multiple onChange={handleFileInputChange} style={{ display: 'none' }} />
                  <button className='btn3' onClick={() => document.querySelector('input[type=file]').click()}> Or Click to Select </button>
                </div>
                <div>
                  {formData.images.map((photo, index) => (
                    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={URL.createObjectURL(photo)} alt={`Photo ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                onChange={e => setFormData({ ...formData, status: e.target.checked })}
              />
            </div>
            <Form.Label className="checkbox-label">Status</Form.Label>
          </Form.Group>
        </Row>
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <button
              type="cancel"
              className="cancel"
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

export default AddVenue;

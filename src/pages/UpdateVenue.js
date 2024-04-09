import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from '../ApiUrl';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StateSelect, CitySelect } from "react-country-state-city";
import Select from 'react-select';
import { FiUpload, FiX } from 'react-icons/fi';
import '../../src/Venue.css';

const UpdateVenue = () => {
  const { _id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    zipcode: "",
    city: "",
    images: [],
    amenities: [],
    category: "",
    status: false,
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchActivities();
    fetchVenue();
  }, []);

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
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleActivityChange = (selectedOption) => {
    setFormData({ ...formData, activities: selectedOption.value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category/fetch`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/activity/fetch`);
      setActivities(response.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const fetchVenue = async () => {
    try {
      const response = await axios.get(`${API_URL}/venue/individual/${_id}`);
      const { venue } = response.data;
      setFormData({
        name: venue.name,
        address: venue.address,
        state: venue.state,
        zipcode: venue.zipcode,
        city: venue.city,
        amenities: venue.amenities,
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

  const handleCancel = () => {
    navigate('/venues');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/venue/edit/${_id}`, formData);
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
      <h3 className="mb-4 title">Update Venue</h3>
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

              <Form.Group controlId="formTimings">
                <Form.Label className="heading">
                  Amenities
                </Form.Label>
                <div className="select-wrapper">
                  <Multiselect
                    options={['Parking', 'Washroom', 'Drinking Water', 'Flood Lights', 'Artificial Turf', 'Seating Lounge', 'Changing Room', 'Power Backup', 'Open 24x7']}
                    selectedValues={formData.amenities}
                    onSelect={handleAmenitiesChange}
                    onRemove={handleAmenitiesChange}
                    displayValue="name"
                    placeholder="Select Amenities"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label className="heading">
                  Category
                </Form.Label>
                <Select
                  name="category"
                  value={formData.category}
                  options={categories.map((category) => ({
                    label: category.category_name,
                    value: category.category_name,
                  }))}
                  onChange={handleCategoryChange}
                  placeholder="Select category"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={4}>
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

            <Form.Group controlId="formLocation">
              <Form.Label className="heading">Zipcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formActivity">
              <Form.Label className="heading">
                Activity
              </Form.Label>
              <Select
                name="activity"
                value={formData.activities}
                options={activities.map((activity) => ({
                  label: activity.activity_name,
                  value: activity.activity_name,
                }))}
                onChange={handleActivityChange}
                placeholder="Select activity"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <h6>State</h6>
            <StateSelect
              countryid={countryid}
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.id });
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
                setFormData({ ...formData, city: e.id });
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
                style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', width: '300px' }}
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
                  checked={formData.status}
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

export default UpdateVenue;

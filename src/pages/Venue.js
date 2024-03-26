import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import "../../src/Venue.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
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
    images: "",
    Category: "",
    amenities: "",
    venuerules: "",
    timings: "",
  });
  console.log(formData, "dfgdgfdf");
  useEffect(() => {
    fetchCategories();
    setCountryid(101);
    // Assuming you have a function to fetch subcategories without specifying a category ID
  }, []);
  console.log(formData, "fromdata value check");
  const [categories, setCategories] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const [files, setFiles] = useState([]);
  const [timings, setTimings] = useState("");
  const [amenities, setAmenities] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files];
    setFiles([...files, ...newFiles]);
  };

  const handlePhotoChange = (e) => {
    const newFiles = [...e.target.files];
    setFiles([...files, ...newFiles]);
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

  const handleAmenitiesChange = (selectedAmenities) => {
    setFormData({
      ...formData,
      amenities: selectedAmenities,
    });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api-kheloindore.swapinfotech.com/api/v1/kheloindore/category/fetch"
      );
      console.log(response.data.categories, "<response.data.categories");
      setCategories(response.data.categories);
      console.log(categories.category_name, "<category.category_name");
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

    // Update Category field
    if (name === "category") {
      setFormData({
        ...formData,
        Category: value,
      });
    }
    // Update SubCategory field
    else if (name === "subcategory") {
      setFormData({
        ...formData,
        SubCategory: value,
      });
    }
    // Update other fields
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  function code4(event) {
    console.log("country code....", event);
    //setCountryid(e.id);
  }

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
    };

    const emptyFields = [];
    for (const field in requiredFields) {
      if (!formData[field]) {
        emptyFields.push(requiredFields[field]);
      }
    }

    try {
      const response = await axios.post(
        "https://api-kheloindore.swapinfotech.com/api/v1/kheloindore/venue1/addVenue",
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
                  <Dropdown onSelect={handleAmenitiesChange}>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {amenities || "Amenities"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Parking">Parking</Dropdown.Item>
                      <Dropdown.Item eventKey="Washroom">
                        Washroom
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Drinking Water">
                        Drinking Water
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Flood Lights">
                        Flood Lights
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Artificial Turf">
                        Artificial Turf
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Seating Lounge">
                        Seating Lounge
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Changing Room">
                        Changing Room
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Power Backup">
                        Power Backup
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Open 24x7">
                        Open 24x7
                      </Dropdown.Item>
                      {/* Add more timing options as needed */}
                    </Dropdown.Menu>
                  </Dropdown>
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
                <MultiSelect
                  name="category"
                  value={formData.category}
                  options={categories.map((category) => ({
                    label: category.category_name,
                    value: category._id,
                  }))}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.value })
                  }
                  placeholder="Select categories"
                  className="multiselect-input"
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
          </Col>
          <Col md={4}>
            {/* Third column content can go here */}

            <h6>State</h6>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
              }}
              placeHolder="Select State"
            />
            <h6>City</h6>
            <CitySelect
              countryid={countryid}
              stateid={stateid}
              onChange={(e) => {
                console.log(e);
              }}
              placeHolder="Select City"
            />
 <Form.Label className="heading">
    Upload Photos
    <span className="StarSymbol">*</span>
  </Form.Label>
<Form.Group
  controlId="formPhotos"
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
  style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', marginTop: '5px' }} // Example inline CSS
>
 
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
    <p>Drag & drop photos here</p>
  </div>
  <button style={{ background:'#ff5f15', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>Select from files</button>
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
        </Row>
      </Container>
    </>
  );
};

export default VenueBooking;

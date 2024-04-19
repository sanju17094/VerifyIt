import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/User.css";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../ApiUrl';



const UpdatePT = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // Fetching ID from URL params
  const id = _id;
  console.log("id ki caluw", id);
  const [formData, setFormData] = useState({
    trainer_name: "",
    duration: "",
    focus_area: "",
    price: "",
    mobile: "",
    status: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data for the given ID
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${API_URL}/PersonalTraining/fetch/${id}`
          );
          const { trainer_name, duration, focus_area, price, mobile, status } =
            response.data.data;
          setFormData({
            trainer_name,
            duration,
            focus_area,
            price,
            mobile,
            status,
          });
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clearing validation error for the field when it's being filled
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    const validationErrors = {};
    // Validation checks go here
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (id) {
        const response = await axios.put(
          `${API_URL}/PersonalTraining/update/${id}`,
          formData
        );
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Trainer Updated",
          });
          navigate("/personal-training");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update",
      });
    }
  };

  const handleCancel = () => {
    // Clear form data
    setFormData({
      trainer_name: "",
      duration: "",
      focus_area: "",
      price: "",
      mobile: "",
      status: false,
    });
    // Clear errors
    setErrors({});
  };

  return (
    <>
      <h3 className="mb-4 title">Update Personal Trainer</h3>
      <Container
        style={{
          maxWidth: "1500px",
          boxShadow: "6px 0px 10px -4px rgba(0,0,0,0.75)",
          marginBottom: "20px",
          marginTop: "50px",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formTrainerName">
                  <Form.Label>
                    Trainer Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Trainer Name"
                    name="trainer_name"
                    value={formData.trainer_name}
                    onChange={handleChange}
                    isInvalid={!!errors.trainer_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.trainer_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDuration">
                  <Form.Label>
                    Duration<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    isInvalid={!!errors.duration}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.duration}
                  </Form.Control.Feedback>
                </Form.Group><br></br>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formFocusArea">
                  <Form.Label>
                    Focus Area<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Focus Area"
                    name="focus_area"
                    value={formData.focus_area}
                    onChange={handleChange}
                    isInvalid={!!errors.focus_area}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.focus_area}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPrice">
                  <Form.Label>
                    Price<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group><br></br>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formMobile">
                  <Form.Label>
                    Mobile Number<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formStatus">
                  <Form.Check
                    type="checkbox"
                    label="Status"
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
              <Col md={12}>
                <div className="ButtonsContainer d-flex justify-content-start">
                  <Button
                    type="submit"
                    className="submit-button"
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Link to="/personal-training">
                    <Button
                      type="button"
                      className="cancel-button"
                      onClick={handleCancel}
                      style={{ backgroundColor: "#303030", color: "#fff" }}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
};

export default UpdatePT;

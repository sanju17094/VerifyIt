import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../src/User.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from '../ApiUrl';

const UpdateUsers = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    role: "",
  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user data based on userId
    axios
      .get(`${API_URL}/user/fetch-user-by-id/${_id}`)
      .then((res) => {
        console.log(res.data, "Data")
        const { first_name, last_name, email, mobile, role } = res.data;
        setFormData({ first_name: res.data.data.first_name, last_name: res.data.data.last_name, email: res.data.data.email, mobile: res.data.data.mobile, role: res.data.data.role });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the validation error for the field when it's being filled
    setErrors({
      ...errors,
      [name]: "",
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    const { first_name, last_name, email, mobile, role } = formData;
    if (!first_name || !last_name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Update the field",
      });
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/super-admin/update-user/${_id}`, formData);
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully",
      });
      navigate('/users');

    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
      });
    }
  };





  const handleCancel = () => {
    // Clear form data
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      role: "",
    });
    // Clear errors
    setErrors({});
  };

  return (
    <>
      <h3 className="mb-4 title">Update Users</h3>
      <Container
        style={{
          maxWidth: "1000px",
          boxShadow: "6px 0px 1px -8px rgba(0,0,0,0.75)",
          marginBottom: "20px",
          marginTop: "30px",
          marginRight: "400px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* First Name and Last Name in one row */}
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>
                  First Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  isInvalid={!!errors.first_name}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>
                  Last Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  isInvalid={!!errors.last_name}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Email and Mobile in one row */}
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>
            </Col>
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
                  style={{ marginTop: "5px", marginBottom: "4px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Role in one row */}
            <Col md={6}>
              <Form.Group controlId="formRole">
                <Form.Label>
                  Role<span className="text-danger">*</span>
                </Form.Label>
                <div className="custom-dropdown">
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                    style={{ height: "auto" }} 
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Coach">Coach</option>
                    <option value="Venue Admin">Venue Admin</option>
                    {/* <option value="Super Admin">Super Admin</option> */}
                    {/* <option value="vendor">Vendor</option> */}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                  <span className="dropdown-arrow">&#9662;</span>{" "}
                  {/* Downward arrow */}
                </div>
              </Form.Group>

              {/* <Form.Group controlId="formCheckbox">
                <div className="checkbox-container">
                  <Form.Check
                    type="checkbox"
                    id="statusCheckbox"
                    name="status"
                    aria-label="option 1"
                    className="checkbox-input"
                    checked={formData.status || false}
                    onChange={e => setformData({ ...formData, status: e.target.checked })}
                  />
                </div>
                <Form.Label className="checkbox-label">Status</Form.Label>
              </Form.Group> */}
            </Col>
          </Row>

          {/* Buttons */}
          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                {" "}
                {/* Align buttons to the left */}
                <button
                  type="submit"
                  className="submit-button"
                  style={{ marginRight: "10px" }}
                >
                  Update
                </button>
                {/* <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  style={{ backgroundColor: "#303030", color: "#fff" }}
                >
                  Cancel
                </button> */}
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UpdateUsers;

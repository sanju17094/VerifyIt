import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../../src/Adduser.css";

const UpdateAdmin = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/kheloindore/admin/fetch-ind/${_id}`)
      .then((res) => {
        setValues(res.data.admin);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!values.first_name || !values.last_name || !values.email || !values.password || !values.mobile || !values.role) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill out all required fields',
        icon: 'error'
      });
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/kheloindore/admin/update/${_id}`);
      console.log(response.data);
      Swal.fire({
        title: 'Updated!',
        text: 'Admin updated successfully!',
        icon: 'success'
      }).then(() => {
        navigate('/Adminlist');
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Admin',
        icon: 'error'
      });
    }
  };
  

  const handleCancel = () => {
    navigate("/Adminlist");
  };

  return (
    <>
      <h3>Update Admin</h3>
      <form onSubmit={handleSubmit}>
      <Container className="adduser">
        <Row className="Form-row">
          <Col md={4}>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>
                  First Name
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  value={values.first_name}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>
                  Email Address
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  required
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={4}>
            <Form>
              <Form.Group controlId="formLastName">
                <Form.Label>
                  Last Name
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  value={values.last_name}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>
                  Password
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={values.password}
                  required
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={4}>
            <Form>
              <Form.Group controlId="formMobileNumber">
                <Form.Label>
                  Mobile Number
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Mobile Number"
                  name="mobile"
                  value={values.mobile}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAdminRole">
                <Form.Label>
                  Admin Role
                  <span className="StarSymbol">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={values.role}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Vendor">Vender</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="formStatus">
              <Form.Check
                type="checkbox"
                label="Status"
                checked={values.status}
                className="StatusCheckbox"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <div className="ButtonsContainer">
            <button type="button" className="btn btn-yellow" onClick={handleSubmit}>
              Update
            </button>
            <button type="button" className="btn btn-dark" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Row>
      </Container>
      </form>
    </>
  );
};

export default UpdateAdmin;

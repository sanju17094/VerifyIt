import React, { useState } from 'react';
import { Container, Form, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    comment: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setAlertVariant('success');
    setAlertMessage('Message sent successfully!');
    setShowAlert(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      comment: '',
    });
    navigate('/');
  };

  return (
    <>
      <h3 className="mb-4 title">Contact Us</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter the subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

              <Form.Group controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="comment"
                  placeholder="Enter your comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
              </Form.Group>

            </Col>
          </Row>
          <button
            type="submit"
            className="submit-button"
          >
            Submit
          </button>
          {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
        </Form>
      </Container>
    </>
  );
};

export default ContactUsForm;

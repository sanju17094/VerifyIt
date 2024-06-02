import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css'; 

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    comments: '',
  });
  const [formVisible, setFormVisible] = useState(true); // State for form visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/Verifyit/contact-us/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          mobile: formData.phone,
          subject: formData.subject,
          comments: formData.comments
        }),
      });
      
      if (response.ok) {
        toast.success('Message sent successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          subject: '',
          comments: '',
        });
        // Hide the form after successful submission
        setFormVisible(false);
        // Close the form and return to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 3000); // Adjust this delay as needed
      } else {
        throw new Error("Failed to submit the contact form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to submit the contact form', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleContactUsClick = () => {
    setFormVisible(true); // Show the form when "Contact Us" button is clicked
  };

  return (
    <>
      {formVisible && (
        <Container className="contact-us-container">
        <h3 className="mb-1 title">Contact Us</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label className="form-label">Full Name <span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-label">Email address <span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="form-label">Phone <span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label className="form-label">Subject <span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Enter the subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formComment">
              <Form.Label className="form-label">Comment <span className="text-danger"> *</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="comments"
                placeholder="Enter your comment"
                value={formData.comments}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <button type="submit" className="submit-button1">
              Submit
            </button>
          </Form>
        </Container>
      )}
      {!formVisible && (
        <Container className="thank-you-container">
          <h4 className="thank-you-msg">Thank you for contacting us!</h4>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default ContactUsForm;

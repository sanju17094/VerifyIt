
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      navigate("/OTPPage");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const loginToken = localStorage.getItem("token2"); // Retrieve token from localStorage
    if (!loginToken) {
      throw new Error('Token not found');
    }

    const response = await axios.post(
      'http://localhost:8000/api/v1/Verifyit/signup/verify-otp',
      { otp },
      { headers: { Authorization: `Bearer ${loginToken}` } } // Include token in headers
    );
    
    console.log('Response from OTP verification:', response.data);
    
    if (response.data && response.data.success) {
      console.log('OTP verified successfully:', response.data.message);
      navigate('/loginpage');
    } else {
      throw new Error(response.data.message || 'OTP verification failed');
    }
  } catch (error) {
    console.error('There was an error verifying the OTP:', error.response || error.message);
    setError(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Error verifying OTP');
  }
};

  

  
  return (
    <div className="container mt-5">
      <h3>Enter OTP</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="otp" className="mb-3">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify OTP
        </Button>
      </Form>
    </div>
  );
}

export default OTPPage;


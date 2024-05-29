
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



// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); 
  
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/Verifyit/signup/verify-otp', { otp });
//       console.log('OTP verified successfully:', response.data);
  
   
//       console.log('Full response:', response);
  

//       if (response.data && response.data.token) {
//         const authToken = response.data.token;
//         const sanitizedToken = authToken.replace(/["']/g, '');
//         setToken(sanitizedToken);
//         localStorage.setItem('token', sanitizedToken);
//         navigate('/login');
//       } else {
//         throw new Error('Unexpected response format');
//       }
//     } catch (error) {
//       console.error('There was an error verifying the OTP:', error.response || error.message);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     }
//   };



const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/Verifyit/signup/verify-otp',
        { otp },
        { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
      );
      console.log('OTP verified successfully:', response.data);
  
      if (response.data && response.data.token) {
        const authToken = response.data.token;
        const sanitizedToken = authToken.replace(/["']/g, '');
        setToken(sanitizedToken);
        localStorage.setItem('token', sanitizedToken);
        navigate('/login');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('There was an error verifying the OTP:', error.response || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Invalid OTP. Please try again.');
      }
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


import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('http://localhost:8000/api/v1/Verifyit/login/password', {
        email,
        mobile,
        password
      });
      console.log('Login successful:', response.data);

     
      const authToken = response.data.token || '';
      localStorage.setItem('token', authToken);

    
      navigate('/mainlayout');
    } catch (error) {
      console.error('There was an error logging in:', error.response || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!error}
            placeholder="Enter Email Address"
            required
          />
        </Form.Group>
        <Form.Group controlId="mobile" className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            onChange={handleMobileChange}
            isInvalid={!!error}
            placeholder="Enter Mobile Number"
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={!!error}
            placeholder="Enter Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;

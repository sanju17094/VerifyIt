import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../src/custom.css';
import { jwtDecode } from 'jwt-decode';
function LoginPage() {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const data = identifier.includes('@')
      ? { email: identifier, password }
      : { mobile: identifier, password };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/Verifyit/login/password', data);
      console.log('Login successful:', response.data);

      const authToken = response.data.token || '';
      localStorage.setItem('token', authToken);
      const decoded = jwtDecode(authToken);

      localStorage.setItem(
        "user",
        JSON.stringify({
          first_name: decoded.first_name,
          last_name: decoded.last_name,
        })
      );

      navigate('/home');
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
    <Container className=" sgn mt-5">
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="identifier" className="mb-3">
          <Form.Label>Email or Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
            isInvalid={!!error}
            placeholder="Enter Email Address or Mobile Number"
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
      <div className=" alrext mt-3">
      <p>Already have account? <Link to="/signup" style={{ color: '#01052e' }}>signup</Link>.</p>

      </div>
    </Container>
  );
}

export default LoginPage;



import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Custom.css';
import {jwtDecode} from 'jwt-decode';
import logo  from '../../Assets/logo.jpeg'


function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true

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

      navigate('/');
    } catch (error) {
      console.error('There was an error logging in:', error.response || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="cnt">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="logo"  /><h2>Login</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="identifier" className="mb-3">
          <Form.Label>Email or Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
            isInvalid={!!error}
            placeholder="Enter Email Address or Mobile Number"
            maxLength={10}
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
        <Button className='btn' type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Login'}
        </Button>
      </Form>
      <div className="alrext mt-3">
        <p>Already have an account? <Link to="/signup" style={{ color: '#01052e' }}>Sign up</Link>.</p>
      </div>
    </div>
  );
}

export default LoginPage;

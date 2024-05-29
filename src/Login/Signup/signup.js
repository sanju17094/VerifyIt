
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../src/custom.css';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      navigate("/");
    }                            
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      axios.post('http://localhost:8000/api/v1/Verifyit/signup', formData)
        .then(response => {
          console.log('Form data submitted successfully:', response.data);
          localStorage.setItem("token2", response.data.token);
          navigate('/OTPPage', { state: { token: response.data.token } }); 
        })
        .catch(error => {
          console.error('There was an error submitting the form:', error);
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container sgn mt-5">
      <div className="text-center mb-4">
        <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
      </div>
      <Form onSubmit={handleSubmit}>
        <h3>Registration</h3>
        {[
          { name: 'first_name', placeholder: 'Enter first name' },
          { name: 'last_name', placeholder: 'Enter last name' },
          { name: 'email', placeholder: 'Enter email address' },
          { name: 'mobile', placeholder: 'Enter mobile number' },
          { name: 'password', placeholder: 'Enter password' },
          { name: 'confirm_password', placeholder: 'Confirm password' }
        ].map((field, idx) => (
          <Form.Group controlId={field.name} key={idx} className="mb-3">
            <Form.Label>
              {field.name === 'confirm_password' ? 'Confirm Password' : field.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type={field.name.includes('password') ? 'password' : 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              isInvalid={!!errors[field.name]}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}
        <Button variant="primary" type="submit" className='btn'>
          Sign Up
        </Button>
      </Form>
      <div className=" alrext mt-3">
        <p>Already have an account? <Link to="/loginpage" style={{ color: '#01052e' }}>Login here</Link>.</p>
      </div>
    </div>
  );
}

export default SignupForm;

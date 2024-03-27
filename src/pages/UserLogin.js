import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import '../../src/UserLogin.css';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token'); 
  };

  return (
    <div className='container' >
    <div className='use'>
    <div className="box">
      <h1>User Login</h1>
      {token ? (
        <div>
          <p>Welcome, user!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : !otpSent ? (
        <LoginForm setOtpSent={setOtpSent} />
      ) : (
        <OtpForm setToken={setToken} navigate={navigate} />
      )}
    </div>
    </div>
    </div>
  );
};

const LoginForm = ({ setOtpSent }) => {
  const initialValues = {
    mobile: '',
  };

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  });

  const handleSendOtp = async (values) => {
    try {
      const response = await axios.post('https://api-kheloindore.swapinfotech.com/api/v1/kheloindore/user/login/mobile', {
        mobile: values.mobile,
      });
      if (response.data.success) {
        setOtpSent(true);
        localStorage.setItem('token', response.data.token);
        Swal.fire('Success!', 'OTP sent successfully!', 'success');
      } else {
        Swal.fire('Error!', 'Failed to send OTP. Please enter valid mobile number.', 'error');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Swal.fire('Error!', 'Failed to send OTP. Please enter valid mobile number.', 'error');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSendOtp(values)}
    >
      <Form>
        <label htmlFor="mobile">Enter Mobile Number:</label>
        <Field type="text" id="mobile" name="mobile" />
        <ErrorMessage name="mobile" component="div" className="error" />
        <button className="mt-3" type="submit">Send OTP</button>
        <p>If you are an admin, click <Link to="/Loginadmin">here</Link> to login as admin.</p>
      </Form>
    </Formik>
  );
};

const OtpForm = ({ setToken, navigate }) => {
  const initialValues = {
    otp: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required')
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        'https://api-kheloindore.swapinfotech.com//api/v1/kheloindore/user/login/mobile/otp',
        { otp: values.otp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        const authToken = response.data.KHELO_INDORE;
        const sanitizedToken = authToken ? authToken.replace(/["']/g, '') : '';
        setToken(sanitizedToken);
        localStorage.setItem('token', response.data.token);
        Swal.fire('Success!', 'Login successful!', 'success');
        navigate('/dashboard'); // Redirect to the dashboard or desired route
      } else {
        Swal.fire('Error!', 'Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Swal.fire('Error!', 'Failed to verify OTP. Please try again.', 'error');
    }
  };

  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      <Form>
        <label htmlFor="otp">Enter OTP:</label>
        <Field type="text" id="otp" name="otp" />
        <ErrorMessage name="otp" component="div" className="error" />
        <button className='mt-3' type="submit">Login</button>
      </Form>
    </Formik>
    
  );
};

export default UserLogin;

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../src/Khelo Indore Logo/Verify_logo.png';
import '../../src/Loginadmin.css';
import { API_URL } from '../ApiUrl';

function Loginadmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
      .test('is-correct-number', 'Incorrect mobile number', function (value) {
        // Check if the entered mobile number is 9999999999
        return value === '9999999999';
      })
      .required('Mobile number is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^admin$/, 'Incorrect password'),
  });


  const formik = useFormik({
    initialValues: {
      mobile: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true); // Set submitting to true before making API call
      if (values.password === 'admin') {
        handleApi(values, setSubmitting); // Pass setSubmitting to handleApi function
      } else {
        Swal.fire({
          title: 'Incorrect Password',
          text: 'Please enter the correct password to log in',
          icon: 'error',
        });
        setSubmitting(false); // Reset submitting state on error
      }
    },
  });

  const handleApi = (formData, setSubmitting) => {
    console.log('Mobile:', formData.mobile);
    console.log('Password:', formData.password);

    axios
      .post(`${API_URL}/user/login`, {
        mobile: formData.mobile,
        password: formData.password,
      })
      .then((response) => {
        console.warn('result', response);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        console.log('Token:', response.data.token);
        // setSubmitting(false); Reset submitting state after successful API call
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('Invalid mobile number or password');
        console.log(error);
        setSubmitting(false); // Reset submitting state on API call error
      });
  };


  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="con">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
            {/* <h2>Login</h2> */}
              <img src={logoImage} alt="Logo" className="logo-image ms-5" style={{ maxWidth: '100px' }} />
              <h1>erifyIt</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="mobile" style={{ fontWeight: 'bold' }}>Mobile Number</label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    maxLength={10}
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="text-danger">{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
                <ClipLoader color={"#000"} loading={formik.isSubmitting} css={override} size={30} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginadmin;

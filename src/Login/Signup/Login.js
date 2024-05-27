import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import logoImage from '../../src/Khelo Indore Logo/Group 88.png';
import './Login.css';
// import { API_URL } from '../ApiUrl';

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
        return value === '9999999999';
      })
      .required('Mobile number is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^admin$/, 'Incorrect password'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      mobile: '',
      password: '',
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (values.password === 'admin') {
        // handleApi(values, setSubmitting);
      } else {
        // Swal.fire({
        //   title: 'Incorrect Password',
        //   text: 'Please enter the correct password to log in',
        //   icon: 'error',
        // });
        setSubmitting(false);
      }
    },
  });

  // const handleApi = (formData, setSubmitting) => {
  //   axios
  //     .post(`${API_URL}/user/login`, {
  //       mobile: formData.mobile,
  //       password: formData.password,
  //     })
  //     .then((response) => {
  //       localStorage.setItem('token', JSON.stringify(response.data.token));
  //       switch (formData.role) {
  //         case 'admin':
  //           navigate('/dashboard');
  //           break;
  //         case 'venue_admin':
  //           navigate('/venue-admin-dashboard');
  //           break;
  //         case 'coach':
  //           navigate('/coach-dashboard');
  //           break;
  //         default:
  //           navigate('/dashboard');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Invalid mobile number or password');
  //       console.log(error);
  //       setSubmitting(false);
  //     });
  // };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("roleSelect");

    selectElement.addEventListener("change", function () {
      if (selectElement.value) {
        selectElement.style.backgroundColor = "orange";
      } else {
        selectElement.style.backgroundColor = "white"; // Reset to default
      }
    });
  });


  return (
    <div className="con">
      <div className="row justify-content-center">
        <div className="col-md-6 col-10">
          <div className="card mt-5">
            <div className="card-body">
              {/* <img src={logoImage} alt="Logo" className="logo-image" style={{ maxWidth: '150px' }} /> */}
              <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                  <label htmlFor="role" style={{ fontWeight: 'bold' }}>Select Role</label>
                  <div className="select-container">
                    <select
                      id="roleSelect"
                      name="role"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Super Admin</option>
                      <option value="venue_admin">Venue Admin</option>
                      <option value="coach">Coach</option>
                    </select>
                    <i className="fa fa-chevron-down select-icon"></i>
                  </div>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="text-danger">{formik.errors.role}</div>
                  ) : null}
                </div>
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
                
                <div className="spinner">
                <button type="submit" className="btn-login">Login
                  <ClipLoader color={"#FFFFFF"} loading={formik.isSubmitting} css={override} size={20} />
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginadmin;

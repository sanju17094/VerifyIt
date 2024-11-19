import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import axios from "axios";

const schema = yup.object().shape({
  mobile: yup.string().required("Mobile number is Required"),
  password: yup.string().required("Password is Required"),
});

function Loginuser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
    dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { isSuccess, message } = authState.auth;

  if (isSuccess) {
    // navigate("admin");
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    formik.handleChange(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    formik.handleChange(e);
  };

  const handleApi = () => {
    console.log({ mobile, password })
    axios.post('http://localhost:8000/api/v1/Verifyit/admin/login', {
      mobile:mobile,
      password: password
    }).then((result) => {
      console.log(result,"token check");
      localStorage.setItem('')
      alert('success')
    })
      .catch(error => {
        alert('Invalid mobile password')
        console.log(error)
      })
  }

  return (
    <div className="py-5" style={{ background: "", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Mobile Number"
            id="mobile"
            name="mobile"
            onChange={handleMobileChange}
            onBlur={formik.handleBlur}
            value={mobile}
          />
          <div className="error mt-2">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChange={handlePasswordChange}
            onBlur={formik.handleBlur}
            value={password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end"></div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
            onClick={handleApi}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginuser;

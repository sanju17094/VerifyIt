import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const CheckValidate = () => {
  const navigate = useNavigate();



  useEffect(() => {
    const getToken = localStorage.getItem('token');
    if (!getToken) {
      navigate('/');
    } // Run checkit whenever navigate changes
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default CheckValidate;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login) {
      navigate('/');
    }
  }, []); // Add empty dependency array to useEffect to run it only once

  return (
    <div>
      {Component && <Component />}
    </div>
  );
}

export default Protected;

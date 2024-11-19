import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { red, green, black, white } from "../action/action";
import { Tooltip } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ThemeList.css"; // Import custom CSS file

function ThemeList() {
  const dispatch = useDispatch();
  
  // console.log("the theme color", themeColor);
    const themeColor = useSelector((state) => state.themeColor.changeColor);
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

    localStorage.setItem(
      "theme",
      JSON.stringify(themeColor)
    );
    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    console.log("the theme color", storedTheme);
  }, [themeColor]);

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header text-center">
          <h2>Select Theme Template</h2>
        </div>
        <div className="card-body d-flex justify-content-around">
        <div
      className="theme-btn"
      onClick={() => dispatch(green())}
      // data-bs-toggle="tooltip"
      // data-bs-placement="top"
      // title="Select Green Theme"
      style={{ cursor: 'pointer' }}
    >
      <img src={require('./green.png')} alt="Select Green Theme" className="theme-image" />
      
      <h6>Template 1</h6>
    </div>
    <div
      className="theme-btn"
      onClick={() => dispatch(black())}
     
      style={{ cursor: 'pointer' }}
    >
      <img src={require('./blue.png')} alt="Select Green Theme" className="theme-image" />
      <h6>Template 2</h6>

    </div>
    <div
      className="theme-btn"
      onClick={() => dispatch(red())}
    
      style={{ cursor: 'pointer' }}
    >
      <img src={require('./red.png')} alt="Select Green Theme" className="theme-image" />
      <h6>Template 3</h6>

    </div>
    <div
      className="theme-btn"
      onClick={() => dispatch(white())}
      style={{ cursor: 'pointer' }}
    >
      <img src={require('./night.png')} alt="Select Green Theme" className="theme-image" />
      <h6>Template 4</h6>

    </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeList;

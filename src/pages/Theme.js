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
          <h2>Select Theme Color</h2>
        </div>
        <div className="card-body d-flex justify-content-around">
          <div className="row">
            <div className="col-md-6">
          <button
            className="btn btn-success btn-lg theme-btn"
            onClick={() => dispatch(green())}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Select Green Theme"
          >
            <i className="bi bi-palette me-2"></i>Green
          </button> </div>

          <div className="col-md-6">
          <button
            className="btn btn-danger btn-lg theme-btn"
            onClick={() => dispatch(red())}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Select Red Theme"
          >
            <i className="bi bi-palette me-2"></i>Red
          </button></div> </div>


<div className="row">

          <div className="col-md-6">
          <button
            className="btn btn-dark-blue btn-lg theme-btn"
            onClick={() => dispatch(black())}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Select Dark Blue Theme"
          >
            <i className="bi bi-palette me-2"></i>Blue
          </button>
          
          </div>

          <div className="col-md-6">
          <button
            className="btn btn-light btn-lg theme-btn"
            onClick={() => dispatch(white())}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Select Light Theme"
          >
            <i className="bi bi-palette me-2"></i>Night
          </button> </div>


        </div> </div>
      </div>
    </div>
  );
}

export default ThemeList;

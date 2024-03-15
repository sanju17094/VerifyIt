import '../../src/SubCategory.css';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";



function SubCategory() {
  const [input, setInput] = useState({
    Subcategory_name: "",
    status: true, 
  });

  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value, type, checked } = event.target;
      const newValue = type === 'checkbox' ? checked : value;
      setInput((input) => ({
        ...input,
        [name]: newValue,
      }));
    }
    console.log(input, "<,,,,,,,,,,ino");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.Subcategory_name.trim() === '') {
      Swal.fire({
        title: "Validation Error!",
        text: "Sub Category cannot be empty",
        icon: "error"
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/kheloindore/subcategory/create",
          input
        );
        console.log("Sub Category Added Successfully:", response);
        Swal.fire({
          title: "Submitted!",
          text: "Sub Category added successfully!",
          icon: "success"
        }).then(() => {
          window.location.href = "/SubCategoryList";
        });
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to add Sub category",
          icon: "error"
        });
      }
    }
  };

  return (
    <div className="form">
      <div className="mb-3">
        <Form.Label htmlFor="text">Add SubCategory*</Form.Label><br></br>
        <h7>Add Subcategory Name</h7>
        <Form.Control
          type="text"
          id="text"
          name="Subcategory_name"
          aria-describedby="passwordHelpBlock"
          className="form-control-sm"
          value={input.Subcategory_name}
          onChange={handleInputChange}
        />
      </div>

      <Form.Group controlId="formCheckbox">
        <div className="checkbox-container">
          <Form.Check
            type="checkbox"
            id="statusCheckbox"
            name="status"
            aria-label="option 1"
            className="checkbox-input"
            checked={input.status}
            onChange={handleInputChange}
          />
        </div>
        <Form.Label className="checkbox-label">Status</Form.Label>
      </Form.Group>

      <div className="mb-3">
        <form>
          <button className="btn1" type="submit" onClick={handleSubmit}>Submit</button>
          <button className="btn2" >Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default SubCategory;

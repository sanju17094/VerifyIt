import '../../src/Category.css';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";



function Category() {

  const [input, setInput] = useState({
    category_name: "",
    status: true,
    images: ""
  });
console.log(input,"<input")

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
    if (input.category_name.trim() === '') {
      Swal.fire({
        title: "Validation Error!",
        text: "Category cannot be empty",
        icon: "error"
      });
    } else {
      try {
        const formData = new FormData();
        formData.append('category_name', input.category_name);
        formData.append('status', input.status);
        for (let i = 0; i < input.images.length; i++) {
          formData.append('images', input.images[i]);
        }
  
        const response = await axios.post(
          "http://localhost:4000/api/v1/kheloindore/category/create",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log("Category Added Successfully:", response);
        Swal.fire({
          title: "Submitted!",
          text: "Category added successfully!",
          icon: "success"
        }).then(() => {
          // Redirect to Categorylist after successful submission
          window.location.href = "/Categorylist";
        });
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to add category",
          icon: "error"
        });
      }
    }
  };

  const handlePhotoChange = (e) => {
    const selectedFiles = e.target.files;
    setInput((prevState) => ({
      ...prevState,
      images: selectedFiles,
    }));
  };

  return (
    <>
    <h3>Add Category</h3>
    <div className="form">
      <div className="mb-3">
        <h7>Add Category Name</h7>
        <span className="StarSymbol">*</span>
        <Form.Control
          type="text"
          id="text"
          name="category_name"
          aria-describedby="passwordHelpBlock"
          className="form-control-sm"
          value={input.category_name}
          onChange={handleInputChange}
        />
        <br></br>
        <Form.Group controlId="formPhotos">
          <h7>Upload Photos</h7>
          <span className="StarSymbol">*</span>
          <Form.Control
            type="file"
            multiple
            name="photos"
            values={input.images}
            onChange={handlePhotoChange}
            style={{ width: '67%' }}
            
          />
        </Form.Group>
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
          <Link to="/Categorylist"><button className="btn2" >Cancel</button></Link>
        </form>
      </div>
    </div>
    </>
  );
}

export default Category;

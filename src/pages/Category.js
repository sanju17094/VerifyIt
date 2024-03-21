import '../../src/Category.css';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Category() {
  const [input, setInput] = useState({
    category_name: "",
    status: true,
    images: [],
    imagePreviews: [],
    imageNames: [],
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setInput((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handlePhotoChange = (e) => {
    const selectedFiles = e.target.files;
    const previews = [];
    const names = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      previews.push(URL.createObjectURL(selectedFiles[i]));
      names.push(selectedFiles[i].name);
    }
    setInput((prevState) => ({
      ...prevState,
      images: selectedFiles,
      imagePreviews: previews,
      imageNames: names,
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const previews = [];
    const names = [];
    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
      names.push(file.name);
    });
    setInput((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
      imagePreviews: [...prevState.imagePreviews, ...previews],
      imageNames: [...prevState.imageNames, ...names],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...input.images];
    const updatedPreviews = [...input.imagePreviews];
    const updatedNames = [...input.imageNames];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    updatedNames.splice(index, 1);
    setInput((prevState) => ({
      ...prevState,
      images: updatedImages,
      imagePreviews: updatedPreviews,
      imageNames: updatedNames,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.category_name.trim() === '' || input.images.length === 0) {
      Swal.fire({
        title: "Validation Error!",
        text: "Category name and photos are required",
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

  return (
    <>
      <h3 class="mb-4 title">Category</h3>
      <div className="form" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="mb-3">
          <h7>Category Name</h7>
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
            <h7>Upload Photo</h7>
            <span className="StarSymbol">*</span>
            <div className="dropzone" >
              <Form.Control
                type="file"
                multiple
                name="photos"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
                ref={fileInputRef}
              />
              <div className="dropzone-text" onClick={() => fileInputRef.current.click()}><br></br>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" style={{ fontSize: '20px', color: '#fcfcfa', borderRadius: '5px', padding: '5px', backgroundColor: '#ff5f15' }}/>
                Click here to upload images
              </div>
              {input.imagePreviews.map((preview, index) => (
                <div key={index} className="image-container">
                  <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                  <div className="image-info">
                    <span>{input.imageNames[index]}</span>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="close-icon"
                      onClick={() => removeImage(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
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
            <button className="btn1" type="submit" onClick={handleSubmit}>Save</button>
            <Link to="/Categorylist"><button className="btn2" >Cancel</button></Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Category;

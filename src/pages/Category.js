import '../../src/Category.css';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import { FiUpload, FiX } from 'react-icons/fi';
import { API_URL } from '../ApiUrl';
import { useNavigate } from 'react-router-dom';

function Category() {
  const [input, setInput] = useState({
    category_name: "",
    images: [],
    status: "true",
  });

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setInput(prevState => ({
      ...prevState,
      images: files,
    }));
  };

  const handleRemovePhoto = (index) => {
    setInput(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/categories');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.category_name.trim() === '') {
      Swal.fire({
        title: "Validation Error!",
        text: "Category name is required",
        icon: "error"
      });
    } else {
      try {
        const formData = new FormData();
        formData.append('category_name', input.category_name);
        formData.append('status', input.status);
        input.images.forEach((image) => {
          formData.append('images', image);
        });

        const response = await axios.post(
          `${API_URL}/category/create`,
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
          window.location.href = "/categories";
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
      <h3 className=''> Category</h3>
      <div className="form">
        <div className="mb-3">
          <h7 style={{marginTop:'10px'}}>Category Name</h7>
          <span className="StarSymbol">*</span>
          <Form.Control
            type="text"
            id="text"
            name="category_name"
            aria-describedby="passwordHelpBlock"
            className="form-control-sm"
            value={input.category_name}
            onChange={(e) => setInput({...input, category_name: e.target.value})}
            style={{marginTop:'10px'}}
          />
        </div>
        <div className="mb-3">
        <h6 style={{fontWeight:'bold',marginBottom:'10px'}}>Upload Photo</h6>
          <div
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              setInput(prevState => ({
                ...prevState,
                images: [...prevState.images, ...files.filter(file => file.type.startsWith('image/'))],
              }));
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', width: '300px' }}
          >
           <h3 style={{fontSize: '18px'}}>Drag & Drop here</h3>
            <div style={{ marginBottom: '10px' }}>
              <FiUpload style={{ fontSize: '48px', marginBottom: '10px' }} />
              <input type="file" multiple onChange={handleFileInputChange} style={{ display: 'none' }} />
              <button className='btn3' onClick={() => document.querySelector('input[type=file]').click()}> Or Click to Select </button>
            </div>
            <div>
              {input.images.map((photo, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={URL.createObjectURL(photo)} alt={`Photo ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                  <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Form.Group controlId="formCheckbox">
          <div className="checkbox-container">
            <Form.Check
              type="checkbox"
              id="statusCheckbox"
              name="status"
              aria-label="option 1"
              className="checkbox-input"
              checked={input.status || false}
              onChange={e => setInput({ ...input, status: e.target.checked })}
            />
          </div>
          <Form.Label className="checkbox-label">Status</Form.Label>
        </Form.Group>

        <div className="mb-3">
          <form>
            <button className="btn1" type="save" onClick={handleSubmit}>Save</button>
           <button className="btn2" type="cancel" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Category;


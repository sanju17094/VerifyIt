import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import { API_URL } from '../ApiUrl';


function Update() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({ category_name: '', status: false });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Define setFilePreview here

  // useEffect(() => {
  //   axios.get(`${API_URL}/category/fetch-ind/${_id}`)
  //     .then(res => {
  //       setValues({ category_name: res.data.category.category_name, status: res.data.category.status });
  //       // Check if category has an image
  //       if (res.data.category.images.length > 0) {
  //         const imageUrl = res.data.category.images[0]; // Assuming only one image is allowed
  //         setFile(imageUrl);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, [_id]);


  useEffect(() => {
    axios.get(`${API_URL}/category/fetch-ind/${_id}`)
      .then(res => {
        setValues({ category_name: res.data.category.category_name, status: res.data.category.status });

        // Check if category has an image
        if (res.data.category.images.length > 0) {
          const imageUrl = res.data.category.images[0]; // Assuming only one image is allowed
          setFile(imageUrl);
          setFilePreview(imageUrl); // Set filePreview with the image URL
        }
      })
      .catch(err => console.log(err));
  }, [_id]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.category_name.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Category cannot be empty',
        icon: 'error'
      });
    } else {
      const formData = new FormData();
      formData.append('category_name', values.category_name);
      formData.append('status', values.status);
      if (file) {
        formData.append('photo', file);
      }

      axios.put(`${API_URL}/category/update/${_id}`, formData)
        .then(res => {
          console.log(res, 'after backend');
          Swal.fire({
            title: 'Updated!',
            text: 'Category updated successfully!',
            icon: 'success'
          }).then(() => {
            navigate('/categories');
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update category',
            icon: 'error'
          });
        });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancel = () => {
    navigate('/categories');
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Label htmlFor="text">Update Category</Form.Label>
          <span className="StarSymbol">*</span>
          <Form.Control
            type="text"
            id="text"
            name="category_name"
            aria-describedby="passwordHelpBlock"
            className="form-control-sm"
            value={values.category_name || ''}
            onChange={e => setValues({ ...values, category_name: e.target.value })}
            placeholder=""
          />
        </div>



        <div className="mb-3">
          <h6 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Update Photo</h6>
          <div
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              setFile(droppedFile);
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', width: '300px' }}
          >
            <h3 style={{ fontSize: '18px' }}>Drag & Drop here</h3>
            <div style={{ marginBottom: '10px' }}>
              <FiUpload style={{ fontSize: '48px', marginBottom: '10px' }} />
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <button className='btn3' onClick={() => document.querySelector('input[type=file]').click()}> Or Click to Select </button>
            </div>

            {/* 
            {filePreview && (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <img src={filePreview} alt="Selected Photo" style={{ width: '100px', height: '100px', margin: '5px' }} />
    <button
      onClick={() => {
        setFile(null);
        setFilePreview(null);
      }}
      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <FiX />
    </button>
  </div>
)} */}



            {filePreview && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={filePreview} alt="Selected Photo" style={{ width: '100px', height: '100px', margin: '5px' }} />
                <button
                  onClick={() => {
                    setFile(null);
                    setFilePreview(null);
                  }}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FiX />
                </button>
              </div>
            )}


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
              checked={values.status || false}
              onChange={e => setValues({ ...values, status: e.target.checked })}
            />
          </div>
          <Form.Label className="checkbox-label">Status</Form.Label>
        </Form.Group>

        <div className="mb-3">
          <button className="btn1" type="submit" onClick={(e) => handleSubmit(e)}>
            Update
          </button>
          <button className="btn2" type="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Update;


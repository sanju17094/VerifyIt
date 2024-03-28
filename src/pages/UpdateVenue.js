import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';

function UpdateVenue() {
  const { _id } = useParams();
  const navigate = useNavigate();
  
  const [values, setValues] = useState({ name: '', category: '', status: false });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/kheloindore/venue/${_id}`)
      .then(res => {
        setValues({ name: res.data.name, category: res.data.category, status: res.data.status });
        if (res.data.photo.length > 0) {
          const imageUrl = res.data.photo[0]; // Assuming only one image is allowed
          setFile(imageUrl);
          setFilePreview(imageUrl);
        }
      })
      .catch(err => console.log(err));
  }, [_id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.trim() === '' || values.category.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Venue name and category cannot be empty',
        icon: 'error'
      });
    } else {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category', values.category);
      formData.append('status', values.status);
      if (file) {
        formData.append('photo', file);
      }
      
      axios.put(`http://localhost:4000/api/v1/kheloindore/venue/update/${_id}`, formData)
        .then(res => {
          console.log(res, 'after backend');
          Swal.fire({
            title: 'Updated!',
            text: 'Venue updated successfully!',
            icon: 'success'
          }).then(() => {
            navigate('/venues');
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update venue',
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

  return (
    <>
    <h3 className="mb-4 title">Update Venues</h3>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Label htmlFor="name">Venue Name</Form.Label>
          <span className="StarSymbol">*</span>
          <Form.Control
            type="text"
            id="name"
            name="name"
            className="form-control-sm"
            value={values.name || ''}
            onChange={e => setValues({ ...values, name: e.target.value })}
            placeholder="Enter venue name"
          />
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="category">Category</Form.Label>
          <span className="StarSymbol">*</span>
          <Form.Control
            type="text"
            id="category"
            name="category"
            className="form-control-sm"
            value={values.category || ''}
            onChange={e => setValues({ ...values, category: e.target.value })}
            placeholder="Enter category"
          />
        </div>

        <div className="mb-3">
          <h6 style={{fontWeight:'bold',marginBottom:'10px'}}>Photo</h6>
          <div
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              setFile(droppedFile);
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', width: '300px' }}
          >
            <h3 style={{fontSize: '18px'}}>Drag & Drop here</h3>
            <div style={{ marginBottom: '10px' }}>
              <FiUpload style={{ fontSize: '48px', marginBottom: '10px' }} />
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <button className='btn3' onClick={() => document.querySelector('input[type=file]').click()}> Or Click to Select </button>
            </div>
            
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
          <button className="btn1" type="submit">
            Update
          </button>
          <Link to="/venues"><button className="btn2">Cancel</button></Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default UpdateVenue;

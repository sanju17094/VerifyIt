import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import { API_URL } from '../ApiUrl';
import Select from 'react-select';


function Update() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({ category_name: '', status: false, parent_category_name: '' });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    fetchParentCategories();
  }, []);


  useEffect(() => {
    axios.get(`${API_URL}/category/fetch-ind/${_id}`)
      .then(res => {
        setValues({ category_name: res.data.category.category_name, status: res.data.category.status,  parent_category_name:res.data.category.parent_category_name });
        // Check if category has an image
        if (res.data.category.images.length > 0) {
          const imageUrl = res.data.category.images[0]; // Assuming only one image is allowed
          setFile(imageUrl);
          setFilePreview(imageUrl); // Set filePreview with the image URL
        }
      })
      .catch(err => console.log(err));
  }, [_id]);


  const handleParentCategoryChange = (selectedOption) => {
    console.log(selectedOption.value,"teh value...")
    setValues({ ...values, parent_category_name: selectedOption.label });
  };


  const fetchParentCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/parent-category/fetch`);
      setParentCategories(response.data.data);
      console.log(response.data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>DATA AA RAHA H");
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };


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
      formData.append('parent_category_name', values.parent_category_name);
      if (file) {
        formData.append('images', file);
      }
      console.log("formData",values);

      axios.put(`${API_URL}/category/update/${_id}`, values)
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
    <>
      <h3 className="mb-4 title">Update Category</h3>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="formParentCategory" style={{ width: '67.5%' }}>
            <Form.Label className="heading">
              Parent Category <span className="StarSymbol">*</span>
            </Form.Label>
            <Select
              name="parent_category_name"
              value={values.parent_category_name}
              options={parentCategories.map(category => ({
                label: category.name,
                value: category.name
              }))}
              onChange={handleParentCategoryChange}
              placeholder={values.parent_category_name}
            />
          </Form.Group><br></br>

          <div className="mb-3">
            <Form.Label htmlFor="text">Category Name</Form.Label>
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
    </>
  );
}

export default Update;


import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './FormStyle.css';
import { useNavigate } from 'react-router-dom';

const UploadDocuments = () => {
  const [formData, setFormData] = useState({
    highSchoolDocument: null,
    intermediateDocument: null,
    graduateDocument: null,
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    highSchoolDocument: null,
    intermediateDocument: null,
    graduateDocument: null,
    profilePhoto: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (files[0]) {
      setPreviews({
        ...previews,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setPreviews({
        ...previews,
        [name]: null,
      });
    }
  };

  const handleRemove = (name, type, file) => {
    setFormData({
      ...formData,
      [name]: null,
      [type]: null,
      [file]: null,
    });

    setPreviews({
      ...previews,
      [name]: null,
    });

    setErrors({
      ...errors,
      [name]: "This field is required.",
    });
  };

  const handleNext = () => {
    navigate('/next_section');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = "This field is required.";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleNext();
    }
  };

  const renderPreview = (file, type, name) => {
    if (!file) return null;
    return (
      <div style={{ marginTop: "10px" }}>
        {type.startsWith('image/') ? (
          <img src={file} alt="Preview" style={{ width: "70%", height: "auto" }} />
        ) : (
          <a href={file} target="_blank" rel="noopener noreferrer">View Document</a>
        )}
        <button type="button" onClick={() => handleRemove(name, type, file)} style={{ marginLeft: "10px", border: "none", background: "none" }}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    );
  };

  return (
    <>
      <h3 className="mb-4 title">Upload Documents</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formHighSchoolDocument">
                <Form.Label>High School Document<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="highSchoolDocument"
                  onChange={handleChange}
                  isInvalid={!!errors.highSchoolDocument}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.highSchoolDocument}
                </Form.Control.Feedback>
                {renderPreview(previews.highSchoolDocument, formData.highSchoolDocument?.type, "highSchoolDocument")}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formIntermediateDocument">
                <Form.Label>12th Grade Document<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="intermediateDocument"
                  onChange={handleChange}
                  isInvalid={!!errors.intermediateDocument}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.intermediateDocument}
                </Form.Control.Feedback>
                {renderPreview(previews.intermediateDocument, formData.intermediateDocument?.type, "intermediateDocument")}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formGraduateDocument">
                <Form.Label>Graduate Document<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="graduateDocument"
                  onChange={handleChange}
                  isInvalid={!!errors.graduateDocument}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.graduateDocument}
                </Form.Control.Feedback>
                {renderPreview(previews.graduateDocument, formData.graduateDocument?.type, "graduateDocument")}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="formProfilePhoto">
                <Form.Label>Profile Photo<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="profilePhoto"
                  onChange={handleChange}
                  isInvalid={!!errors.profilePhoto}
                  style={{ marginTop: "5px", marginBottom: "15px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.profilePhoto}
                </Form.Control.Feedback>
                {renderPreview(previews.profilePhoto, formData.profilePhoto?.type, "profilePhoto")}
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Save and Next
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UploadDocuments;

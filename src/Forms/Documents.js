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
    postGraduateDocument: null,
    aadharCard: null,
    panCard: null,
    licence: null,
    voterIdCard: null,
    offerLetter1: null,
    offerLetter2: null,
    offerLetter3: null,
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    highSchoolDocument: null,
    intermediateDocument: null,
    graduateDocument: null,
    postGraduateDocument: null,
    aadharCard: null,
    panCard: null,
    licence: null,
    voterIdCard: null,
    offerLetter1: null,
    offerLetter2: null,
    offerLetter3: null,
    profilePhoto: null,
  });
const documentUpload = JSON.parse(localStorage.getItem('documentUpload'));
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
    navigate('/preview_all');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
    // const newErrors = {};
    // Object.keys(formData).forEach(key => {
    //   if (!formData[key]) {
    //     newErrors[key] = "This field is required.";
    //   }
    // });
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
      handleNext();

    // }
  };

  const renderPreview = (file, type, name) => {
    if (!file) return null;
    return (
      <div style={{ marginTop: "10px" }}>
        {type.startsWith('image/') ? (
          <img src={file} alt="Preview" style={{ width: "40%", height: "auto" }} />
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
            {documentUpload.includes("high") && (
              <Col md={4}>
                <Form.Group controlId="formHighSchoolDocument">
                  <Form.Label>
                    High School Document<span className="text-danger">*</span>
                  </Form.Label>
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
                  {renderPreview(
                    previews.highSchoolDocument,
                    formData.highSchoolDocument?.type,
                    "highSchoolDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("inter") && (
              <Col md={4}>
                <Form.Group controlId="formIntermediateDocument">
                  <Form.Label>
                    12th Grade Document<span className="text-danger">*</span>
                  </Form.Label>
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
                  {renderPreview(
                    previews.intermediateDocument,
                    formData.intermediateDocument?.type,
                    "intermediateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("graduate") && (
              <Col md={4}>
                <Form.Group controlId="formGraduateDocument">
                  <Form.Label>
                    Graduate Document<span className="text-danger">*</span>
                  </Form.Label>
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
                  {renderPreview(
                    previews.graduateDocument,
                    formData.graduateDocument?.type,
                    "graduateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("post") && (
              <Col md={4}>
                <Form.Group controlId="formPostGraduateDocument">
                  <Form.Label>
                    Post Graduate Document<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="postGraduateDocument"
                    onChange={handleChange}
                    isInvalid={!!errors.postGraduateDocument}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postGraduateDocument}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.postGraduateDocument,
                    formData.postGraduateDocument?.type,
                    "postGraduateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("aadhar_card") && (
              <Col md={4}>
                <Form.Group controlId="formAadharCard">
                  <Form.Label>
                    Aadhar Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="aadharCard"
                    onChange={handleChange}
                    isInvalid={!!errors.aadharCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.aadharCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.aadharCard,
                    formData.aadharCard?.type,
                    "aadharCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("pan_card") && (
              <Col md={4}>
                <Form.Group controlId="formPanCard">
                  <Form.Label>
                    PAN Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="panCard"
                    onChange={handleChange}
                    isInvalid={!!errors.panCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.panCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.panCard,
                    formData.panCard?.type,
                    "panCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("licence") && (
              <Col md={4}>
                <Form.Group controlId="formLicence">
                  <Form.Label>
                    Licence<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="licence"
                    onChange={handleChange}
                    isInvalid={!!errors.licence}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.licence}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.licence,
                    formData.licence?.type,
                    "licence"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("voter_id") && (
              <Col md={4}>
                <Form.Group controlId="formVoterIdCard">
                  <Form.Label>
                    Voter ID Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="voterIdCard"
                    onChange={handleChange}
                    isInvalid={!!errors.voterIdCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.voterIdCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.voterIdCard,
                    formData.voterIdCard?.type,
                    "voterIdCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("passport") && (
              <Col md={4}>
                <Form.Group controlId="formPassport">
                  <Form.Label>
                    Passport<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="voterIdCard"
                    onChange={handleChange}
                    isInvalid={!!errors.voterIdCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.voterIdCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.voterIdCard,
                    formData.voterIdCard?.type,
                    "voterIdCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job1") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter1">
                  <Form.Label>
                    Offer Letter 1<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter1"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter1}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter1}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter1,
                    formData.offerLetter1?.type,
                    "offerLetter1"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job2") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter2">
                  <Form.Label>
                    Offer Letter 2<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter2"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter2}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter2}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter2,
                    formData.offerLetter2?.type,
                    "offerLetter2"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job3") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter3">
                  <Form.Label>
                    Offer Letter 3<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter3"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter3}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter3}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter3,
                    formData.offerLetter3?.type,
                    "offerLetter3"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("profile") && (
              <Col md={4}>
                <Form.Group controlId="formProfilePhoto">
                  <Form.Label>
                    Profile Photo<span className="text-danger">*</span>
                  </Form.Label>
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
                  {renderPreview(
                    previews.profilePhoto,
                    formData.profilePhoto?.type,
                    "profilePhoto"
                  )}
                </Form.Group>
              </Col>
            )}
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

                <button type="submit" className="submit-button">
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

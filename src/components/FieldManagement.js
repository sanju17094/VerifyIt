

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './FieldManagement.css';


function FieldManagement() {
  const [data, setData] = useState({});
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedPersonalDetails, setSelectedPersonalDetails] = useState([]);
  const [selectedProfessionalDetails, setSelectedProfessionalDetails] = useState([]);
  const [selectedDocumentsDetails, setSelectedDocumentsDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/Verifyit/users/get-id/665712fa66b5401e28ee4a34')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFieldSelect = (field) => {
    const index = selectedFields.indexOf(field);
    if (index === -1) {
      setSelectedFields([...selectedFields, field]);
    } else {
      const updatedFields = [...selectedFields];
      updatedFields.splice(index, 1);
      setSelectedFields(updatedFields);
      setSelectedPrograms([]);
      setSelectedPersonalDetails([]);
      setSelectedProfessionalDetails([]);
      setSelectedDocumentsDetails([]);
    }
  };

  const handleProgramSelect = (program) => {
    const index = selectedPrograms.indexOf(program);
    if (index === -1) {
      setSelectedPrograms([...selectedPrograms, program]);
    } else {
      const updatedPrograms = [...selectedPrograms];
      updatedPrograms.splice(index, 1);
      setSelectedPrograms(updatedPrograms);
    }
  };

  const handlePersonalDetailSelect = (detail) => {
    const index = selectedPersonalDetails.indexOf(detail);
    if (index === -1) {
      setSelectedPersonalDetails([...selectedPersonalDetails, detail]);
    } else {
      const updatedDetails = [...selectedPersonalDetails];
      updatedDetails.splice(index, 1);
      setSelectedPersonalDetails(updatedDetails);
    }
  };

  const handleProfessionalDetailSelect = (detail) => {
    const index = selectedProfessionalDetails.indexOf(detail);
    if (index === -1) {
      setSelectedProfessionalDetails([...selectedProfessionalDetails, detail]);
    } else {
      const updatedDetails = [...selectedProfessionalDetails];
      updatedDetails.splice(index, 1);
      setSelectedProfessionalDetails(updatedDetails);
    }
  };

  const handleDocumentsDetailSelect = (detail) => {
    const index = selectedDocumentsDetails.indexOf(detail);
    if (index === -1) {
      setSelectedDocumentsDetails([...selectedDocumentsDetails, detail]);
    } else {
      const updatedDetails = [...selectedDocumentsDetails];
      updatedDetails.splice(index, 1);
      setSelectedDocumentsDetails(updatedDetails);
    }
  };

  const renderPersonalDetails = (details) => (
    <Row>
     <h3>Personal Details</h3>
      <Col md={6}>
        {selectedPersonalDetails.includes('Name') && <p>Name: {details.first_name} {details.last_name}</p>}
        {selectedPersonalDetails.includes('Email') && <p>Email: {details.email}</p>}
        {selectedPersonalDetails.includes('Mobile') && <p>Mobile: {details.mobile}</p>}
        {selectedPersonalDetails.includes('Location') && (
          <p>Location: {details.personal_details.location.address}, {details.personal_details.location.city}, {details.personal_details.location.state}, {details.personal_details.location.country}, {details.personal_details.location.zipcode}</p>
        )}
      </Col>
      <Col md={6}>
        {selectedPersonalDetails.includes('Gender') && <p>Gender: {details.personal_details.gender}</p>}
        {selectedPersonalDetails.includes('DOB') && <p>Date of Birth: {new Date(details.personal_details.dob).toDateString()}</p>}
        {selectedPersonalDetails.includes('ID Proof') && <p>ID Proof: {details.personal_details.idProof}</p>}
        {selectedPersonalDetails.includes('ID Proof Number') && <p>ID Proof Number: {details.personal_details.idProofNumber}</p>}
      </Col>
    </Row>
  );

  const renderEducationalDetails = (details) => (
    <Row>
     <h3>Educational Details</h3>
      {selectedPrograms.map((program, index) => (
        <Col md={6} key={index}>
          <h4>{program.program} - {program.board_university}</h4>
          <p>School/College: {program.school_college_name}</p>
          <p>Score: {program.score} ({program.score_type})</p>
          <p>Start Date: {new Date(program.start_date).toDateString()}</p>
          <p>End Date: {new Date(program.end_date).toDateString()}</p>
          <p>Branch/Specialization: {program.branch_specialization}</p>
        </Col>
      ))}
    </Row>
  );

  const renderProfessionalDetails = (details) => (
    <Row>
     <h3>Professional Details</h3>
      {selectedProfessionalDetails.map((job, index) => (
        <Col md={6} key={index}>
          <h4>{job.company_name} - {job.job_title}</h4>
          <p>Location: {job.location}</p>
          <p>Position Type: {job.position_type}</p>
          <p>Company Sector: {job.company_sector}</p>
          <p>Start Time: {new Date(job.start_time).toDateString()}</p>
          <p>End Time: {new Date(job.end_time).toDateString()}</p>
          <p>Salary: {job.salary}</p>
          <p>More Details: {job.more_details}</p>
        </Col>
      ))}
    </Row>
  );

  const renderDocumentsDetails = (details) => (
    <Row>
     <h3>Documents Details</h3>
      <Col md={6}>
        {selectedDocumentsDetails.includes('Adhar Card') && (
          <p>Adhar Card: <a href={details.documents_details.adharCard.src}>{details.documents_details.adharCard.orgname}</a></p>
        )}
        {selectedDocumentsDetails.includes('Profile Photo') && (
          <p>Profile Photo: <a href={details.documents_details.profilePhoto.src}>{details.documents_details.profilePhoto.orgname}</a></p>
        )}
        {selectedDocumentsDetails.includes('X Marksheet') && (
          <p>X Marksheet: <a href={details.documents_details.x_marksheet.src}>{details.documents_details.x_marksheet.orgname}</a></p>
        )}
      </Col>
      <Col md={6}>
        {selectedDocumentsDetails.includes('XII Marksheet') && (
          <p>XII Marksheet: <a href={details.documents_details.xii_marksheet.src}>{details.documents_details.xii_marksheet.orgname}</a></p>
        )}
        {selectedDocumentsDetails.includes('Graduation Marksheet') && (
          <p>Graduation Marksheet: <a href={details.documents_details.graduationMarksheet.src}>{details.documents_details.graduationMarksheet.orgname}</a></p>
        )}
        {selectedDocumentsDetails.includes('Offer Letter') && (
          details.documents_details.offerLetter.map((doc, idx) => (
            <p key={idx}>Offer Letter: <a href={doc.src}>{doc.orgname}</a></p>
          ))
        )}
      </Col>
    </Row>
  );

  const renderDetails = (field) => {
    switch (field) {
      case 'Personal Details':
        return renderPersonalDetails(data);
      case 'Educational Details':
        return renderEducationalDetails(data.educational_details);
      case 'Professional Details':
        return renderProfessionalDetails(data.professional_details.details);
      case 'Documents Details':
        return renderDocumentsDetails(data);
      default:
        return null;
    }
  };

  const clearSelection = () => {
    setSelectedFields([]);
    setSelectedPrograms([]);
    setSelectedPersonalDetails([]);
    setSelectedProfessionalDetails([]);
    setSelectedDocumentsDetails([]);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <Form>
            {['Personal Details', 'Educational Details', 'Professional Details', 'Documents Details'].map((field, index) => (
              <div key={index}>
                <Form.Check 
                  type="checkbox"
                  label={field}
                  onChange={() => handleFieldSelect(field)}
                  checked={selectedFields.includes(field)}
                />
                {selectedFields.includes(field) && (
                  <div>
                    {field === 'Personal Details' && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Personal Details
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {['Name', 'Email', 'Mobile', 'Location', 'Gender', 'DOB', 'ID Proof', 'ID Proof Number'].map((detail, idx) => (
                            <Form.Check 
                              key={idx}
                              type="checkbox"
                              label={detail}
                              onChange={() => handlePersonalDetailSelect(detail)}
                              checked={selectedPersonalDetails.includes(detail)}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {field === 'Educational Details' && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Program
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {data.educational_details && data.educational_details.education.map((program, index) => (
                            <Form.Check 
                              key={index}
                              type="checkbox"
                              label={`${program.program} - ${program.board_university}`}
                              onChange={() => handleProgramSelect(program)}
                              checked={selectedPrograms.includes(program)}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {field === 'Professional Details' && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Professional Details
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {data.professional_details && data.professional_details.details.map((job, index) => (
                            <Form.Check 
                              key={index}
                              type="checkbox"
                              label={`${job.company_name} - ${job.job_title}`}
                              onChange={() => handleProfessionalDetailSelect(job)}
                              checked={selectedProfessionalDetails.includes(job)}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {field === 'Documents Details' && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Documents Details
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {['Adhar Card', 'Profile Photo', 'X Marksheet', 'XII Marksheet', 'Graduation Marksheet', 'Offer Letter'].map((detail, idx) => (
                            <Form.Check 
                              key={idx}
                              type="checkbox"
                              label={detail}
                              onChange={() => handleDocumentsDetailSelect(detail)}
                              checked={selectedDocumentsDetails.includes(detail)}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Form>
        </Col>
        {/* Main Content */}
        <Col md={9}>
          <h4>Selected Details</h4>
          {selectedFields.map((field, index) => (
            <div key={index}>
              {renderDetails(field)}
            </div>
          ))}
          <Button variant="danger" onClick={clearSelection}>Clear Selection</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FieldManagement;


import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './FormStyle.css';

const ProfessionalDetailsForm = ({ index, formData, handleChange, removeProfessionalDetail, errors }) => {
  return (
    <div className="mb-4">
      <h5 className="mb-3">
        Professional Detail {index + 1}
        {index > 0 && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeProfessionalDetail(index)}
            className="remove-icon"
          />
        )}
      </h5>
      <Row>
        <Col md={4}>
          <Form.Group controlId={`formCompanyName${index}`}>
            <Form.Label>Company Name<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`companyName${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors[`companyName${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formJobTitle${index}`}>
            <Form.Label>Job Title<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`jobTitle${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors[`jobTitle${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formLocation${index}`}>
            <Form.Label>Location<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              name="location"
              value={formData.location}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group controlId={`formPositionType${index}`}>
            <Form.Label>Position Type<span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              name="positionType"
              value={formData.positionType}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            >
              <option value="">Select Position Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formCompanySector${index}`}>
            <Form.Label>Company Sector<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Sector"
              name="companySector"
              value={formData.companySector}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formSalary${index}`}>
            <Form.Label>Salary<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Salary"
              name="salary"
              value={formData.salary}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group controlId={`formStartTime${index}`}>
            <Form.Label>Start Time<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              name="startTime"
              value={formData.startTime}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formEndTime${index}`}>
            <Form.Label>End Time<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              name="endTime"
              value={formData.endTime}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
              
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId={`formMoreDetails${index}`}>
            <Form.Label>More Details</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter More Details"
              name="moreDetails"
              value={formData.moreDetails}
              onChange={(e) => handleChange(e, index)}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ProfessionalDetailsForm;

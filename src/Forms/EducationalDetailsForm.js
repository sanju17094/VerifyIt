import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./FormStyle.css";

const EducationDetailForm = ({
  index,
  formData,
  handleChange,
  removeEducationDetail,
  errors,
}) => {
  const titles = ["High School", "Intermediate", "Graduate", "Post Graduate"];
  const title = titles[index] || `Education Detail ${index + 1}`;

  return (
    <div className="mb-4">
      <h5 className="mb-3">
        {title}
        {index > 0 && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeEducationDetail(index)}
            className="remove-icon"
          />
        )}
      </h5>
      <Row>
        <Col md={6}>
          <Form.Group controlId={`formProgram${index}`}>
            <Form.Label>
              Program<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Program"
              name="program"
              value={formData.program}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`program${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`program${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId={`formSchoolCollegeName${index}`}>
            <Form.Label>
              School/College Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter School/College Name"
              name="school_college_name"
              value={formData.school_college_name}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`school_college_name${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`school_college_name${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId={`formScore${index}`}>
            <Form.Label>
              Score<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Score"
              name="score"
              value={formData.score}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`score${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`score${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId={`formScoreType${index}`}>
            <Form.Label>
              Score Type<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={formData.score_type}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`score_type${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            >
              <option value="">Select Score Type</option>
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors[`score_type${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId={`formStartDate${index}`}>
            <Form.Label>
              Start Date<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`start_date${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`start_date${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId={`formEndDate${index}`}>
            <Form.Label>
              End Date<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`end_date${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`end_date${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId={`formBoardUniversity${index}`}>
            <Form.Label>
              Board/University<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Board/University"
              name="board_university"
              value={formData.board_university}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`board_university${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`board_university${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId={`formBranchSpecialization${index}`}>
            <Form.Label>Branch/Specialization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Branch/Specialization"
              name="branch_specialization"
              value={formData.branch_specialization}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`branch_specialization${index}`]}
              style={{ marginTop: "5px", marginBottom: "15px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`branch_specialization${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default EducationDetailForm;

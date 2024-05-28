import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './FormStyle.css';

const EducationDetailForm = ({ index, formData, handleChange, removeEducationDetail, errors }) => {
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
                        <Form.Label>Program<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Program"
                            name={`program${index}`}
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
                        <Form.Label>School/College Name<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter School/College Name"
                            name={`schoolCollegeName${index}`}
                            value={formData.school_college_name}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`schoolCollegeName${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`schoolCollegeName${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId={`formBoardUniversity${index}`}>
                        <Form.Label>Board/University<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Board/University"
                            name={`boardUniversity${index}`}
                            value={formData.board_university}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`boardUniversity${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`boardUniversity${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId={`formBranchSpecialization${index}`}>
                        <Form.Label>Branch/Specialization</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Branch/Specialization"
                            name={`branchSpecialization${index}`}
                            value={formData.branch_specialization}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`branchSpecialization${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`branchSpecialization${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId={`formScoreType${index}`}>
                        <Form.Label>Score Type<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Score Type"
                            name={`scoreType${index}`}
                            value={formData.scoreType}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`scoreType${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`scoreType${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId={`formScore${index}`}>
                        <Form.Label>Score<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Score"
                            name={`score${index}`}
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
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId={`formStartDate${index}`}>
                        <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="date"
                            name={`startDate${index}`}
                            value={formData.start_date}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`startDate${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`startDate${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId={`formEndDate${index}`}>
                        <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="date"
                            name={`endDate${index}`}
                            value={formData.end_date}
                            onChange={(e) => handleChange(e, index)}
                            isInvalid={!!errors[`endDate${index}`]}
                            style={{ marginTop: "5px", marginBottom: "15px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`endDate${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>

            </Row>
        </div>
    );
};

export default EducationDetailForm;

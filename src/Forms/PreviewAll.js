import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const PreviewAll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/Verifyit/users/get-id/665712fa66b5401e28ee4a34"
        );
        const userData = response.data.data;

        // Check if the response contains the expected array
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          setUsers([userData]); // Wrap the object in an array if it's a single object
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4 title">Preview Details</h3>
      {users.map((user) => (
        <div key={user._id}>
          {user.personal_details && (
            <Card className="mb-4">
              <Card.Header>Personal Details</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <strong>First Name:</strong> {user.first_name}
                  </Col>
                  <Col md={6}>
                    <strong>Last Name:</strong> {user.last_name}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>Email Address:</strong> {user.email}
                  </Col>
                  <Col md={6}>
                    <strong>Mobile Number:</strong> {user.mobile}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>Address:</strong>{" "}
                    {user.personal_details.location.address}
                  </Col>
                  <Col md={6}>
                    <strong>City:</strong> {user.personal_details.location.city}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>State:</strong>{" "}
                    {user.personal_details.location.state}
                  </Col>
                  <Col md={6}>
                    <strong>Country:</strong>{" "}
                    {user.personal_details.location.country}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>Zipcode:</strong>{" "}
                    {user.personal_details.location.zipcode}
                  </Col>
                  <Col md={6}>
                    <strong>Gender:</strong> {user.personal_details.gender}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(user.personal_details.dob).toLocaleDateString()}
                  </Col>
                  <Col md={6}>
                    <strong>ID Proof:</strong> {user.personal_details.idProof}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <strong>ID Proof Number:</strong>{" "}
                    {user.personal_details.idProofNumber}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {user.educational_details && user.educational_details.education && (
            <Card className="mb-4">
              <Card.Header>Educational Details</Card.Header>
              <Card.Body>
                {user.educational_details.education.map((edu, index) => (
                  <div key={edu._id}>
                    <Row>
                      <Col md={6}>
                        <strong>Program:</strong> {edu.program}
                      </Col>
                      <Col md={6}>
                        <strong>School/College Name:</strong>{" "}
                        {edu.school_college_name}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <strong>Board/University:</strong>{" "}
                        {edu.board_university}
                      </Col>
                      <Col md={6}>
                        <strong>Score:</strong> {edu.score}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <strong>Start Date:</strong>{" "}
                        {new Date(edu.start_date).toLocaleDateString()}
                      </Col>
                      <Col md={6}>
                        <strong>End Date:</strong>{" "}
                        {new Date(edu.end_date).toLocaleDateString()}
                      </Col>
                    </Row>
                    {edu.branch_specialization && (
                      <Row>
                        <Col md={6}>
                          <strong>Branch/Specialization:</strong>{" "}
                          {edu.branch_specialization}
                        </Col>
                      </Row>
                    )}
                    {index < user.educational_details.education.length - 1 && (
                      <hr />
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </div>
      ))}
    </Container>
  );
};

export default PreviewAll;

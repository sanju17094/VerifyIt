import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import './preview.css'
const PreviewAll = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { _id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const id = decode.userID;
  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);

  const handleNext = () => {
    if (Array.isArray(sequenceArray)) {
      const nextPage = sequenceArray[0];
      const link = map1.get(nextPage);
      navigate(`/${link}`);
    }
    }


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/Verifyit/users/get-id/${id}`
        );
        setUser(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleSubmit = async () => {
    console.log("Submit clicked");
    const response = await fetch(
      `http://localhost:8000/api/v1/Verifyit/submit/all/${id}`
    );
    const result = await response.json();
    console.log("submit document result->>>", result);
    if (!result.success) {
      console.log("There is some error in submitting the documents");
    } else {
      navigate("/verification-status");
    }
  };

  const handlePdfClick = (url) => {
    setPdfUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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

  if (!user) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="info">No user found.</Alert>
      </Container>
    );
  }

  return (
    <>
      <h3 className="mb-4 title">Preview Details</h3>
      <Container>
        {user.personal_details && (
          <Card className="mb-4">
            <Card.Header>Personal Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={12}>
                      <strong>First Name:</strong> {user.first_name}
                    </Col>
                    <Col md={12}>
                      <strong>Last Name:</strong> {user.last_name}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>Email Address:</strong> {user.email}
                    </Col>
                    <Col md={12}>
                      <strong>Mobile Number:</strong> {user.mobile}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>Address:</strong>{" "}
                      {user.personal_details.location.address}
                    </Col>
                    <Col md={12}>
                      <strong>City:</strong>{" "}
                      {user.personal_details.location.city}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>State:</strong>{" "}
                      {user.personal_details.location.state}
                    </Col>
                    <Col md={12}>
                      <strong>Country:</strong>{" "}
                      {user.personal_details.location.country}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>Zipcode:</strong>{" "}
                      {user.personal_details.location.zipcode}
                    </Col>
                    <Col md={12}>
                      <strong>Gender:</strong> {user.personal_details.gender}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(user.personal_details.dob).toLocaleDateString()}
                    </Col>
                    <Col md={12}>
                      <strong>ID Proof:</strong> {user.personal_details.idProof}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>ID Proof Number:</strong>{" "}
                      {user.personal_details.idProofNumber}
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={2}
                  className="d-flex justify-content-end align-items-center"
                >
                  {user.documents_details &&
                    user.documents_details.profilePhoto && (
                      <div className="img1">
                        <img
                          src={`http://localhost:8000/${user.documents_details.profilePhoto.src.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Profile"
                          style={{ width: "130px", height: "140px" }}
                        />
                      </div>
                    )}
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
                      <strong>Board/University:</strong> {edu.board_university}
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

        {user.professional_details && user.professional_details.details && (
          <Card className="mb-4">
            <Card.Header>Professional Details</Card.Header>
            <Card.Body>
              {user.professional_details.details.map((job, index) => (
                <div key={job._id}>
                  <Row>
                    <Col md={6}>
                      <strong>Company Name:</strong> {job.company_name}
                    </Col>
                    <Col md={6}>
                      <strong>Job Title:</strong> {job.job_title}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <strong>Location:</strong> {job.location}
                    </Col>
                    <Col md={6}>
                      <strong>Position Type:</strong> {job.position_type}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <strong>Company Sector:</strong> {job.company_sector}
                    </Col>
                    <Col md={6}>
                      <strong>Salary:</strong> {job.salary}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <strong>Start Date:</strong>{" "}
                      {new Date(job.start_time).toLocaleDateString()}
                    </Col>
                    <Col md={6}>
                      <strong>End Date:</strong>{" "}
                      {new Date(job.end_time).toLocaleDateString()}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <strong>More Details:</strong> {job.more_details}
                    </Col>
                  </Row>
                  {index < user.professional_details.details.length - 1 && (
                    <hr />
                  )}
                </div>
              ))}
            </Card.Body>
          </Card>
        )}

        {user.documents_details && (
          <Card className="mb-4">
            <Card.Header>Document Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Adhar Card:</strong>
                </Col>
                <Col md={6}>
                  {user.documents_details.adharCard && (
                    <Button variant="link" onClick={() => handlePdfClick(`http://localhost:8000/${user.documents_details.adharCard.src.replace(/\\/g, "/")}`)}>
                      {user.documents_details.adharCard.orgname}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>High School Marksheet:</strong>
                </Col>
                <Col md={6}>
                  {user.documents_details.x_marksheet && (
                    <Button variant="link" onClick={() => handlePdfClick(`http://localhost:8000/${user.documents_details.x_marksheet.src.replace(/\\/g, "/")}`)}>
                      {user.documents_details.x_marksheet.orgname}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Intermediate Marksheet:</strong>
                </Col>
                <Col md={6}>
                  {user.documents_details.xii_marksheet && (
                    <Button variant="link" onClick={() => handlePdfClick(`http://localhost:8000/${user.documents_details.xii_marksheet.src.replace(/\\/g, "/")}`)}>
                      {user.documents_details.xii_marksheet.orgname}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Graduation Marksheet:</strong>
                </Col>
                <Col md={6}>
                  {user.documents_details.graduationMarksheet && (
                    <Button variant="link" onClick={() => handlePdfClick(`http://localhost:8000/${user.documents_details.graduationMarksheet.src.replace(/\\/g, "/")}`)}>
                      {user.documents_details.graduationMarksheet.orgname}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Offer Letters:</strong>
                </Col>
                <Col md={6}>
                  {user.documents_details.offerLetter &&
                    user.documents_details.offerLetter.map((doc, index) => (
                      <div key={index}>
                        <Button variant="link" onClick={() => handlePdfClick(`http://localhost:8000/${doc.src.replace(/\\/g, "/")}`)}>
                          {doc.orgname}
                        </Button>
                      </div>
                    ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Document Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe src={pdfUrl} style={{ width: '100%', height: '600px' }} title="PDF Viewer"></iframe>
          </Modal.Body>
        </Modal>

        <div className="mb-4">
          <button className="cancel-button" onClick={handleNext}>
            Go Back
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default PreviewAll;

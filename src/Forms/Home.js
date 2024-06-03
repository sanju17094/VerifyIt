import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GreetingPage.css";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import VerificationStatus from "./VerificationStatus";
import ContactUsForm from "./ContactUs";

const HomePage = () => {
  const [statusPage, setStatusPage] = useState({
    submited: false,
    verification: false,
    adminMessage: ""
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const contactFormRef = useRef(null); // Ref for the contact form card
  const doubleClickRef = useRef(false); // Ref for double-click detection

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/loginpage");
      return;
    }

    let id;
    try {
      const decode = jwtDecode(token);
      id = decode.userID;
      console.log("User ID->>>>", id);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/loginpage");
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/Verifyit/fetch/submit-verification/${id}`
        );
        const result = await response.json();
        setStatusPage({
          submited: result.data.submitted,
          verification: result.data.verified,
          adminMessage: result.data.admin_message
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [navigate]);

  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);

  const handleNext = () => {
    if (Array.isArray(sequenceArray)) {
      const nextPage = sequenceArray[0];
      const link = map1.get(nextPage);
      navigate(`/${link}`);
    } else {
      console.error("sequenceArrayData is not a valid array");
    }
  };

  const handleContactUsClick = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const handleSubmitContactForm = () => {
    setShowContactForm(false); // Hide the form on submit
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {statusPage.submited ? (
        <VerificationStatus
          submited={statusPage.submited}
          verification={statusPage.verification}
          adminMessage={statusPage.adminMessage}
        />
      ) : (
        <div className="greetingPage">
          <div className="homepage">
            <main>
              <section className="home">
                <h2>Welcome to VerifyIt!</h2>
                <div className="home-content">
                  <p>
                    Your go-to platform for verification and authentication
                    services. We ensure accuracy and reliability in all your
                    important documents and data.
                  </p>
                </div>
                <div className="buttons">
                  <button className="btn1" onClick={handleNext}>
                    Get Started
                  </button>
                  <button
                    className="btn2"
                    onClick={handleContactUsClick}
                    onDoubleClick={() => {
                      // Set doubleClickRef to true when double-clicked
                      doubleClickRef.current = true;
                      setTimeout(() => {
                        // Reset doubleClickRef after a short delay
                        doubleClickRef.current = false;
                      }, 300); // Adjust this delay as needed
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </section>
            </main>
            {showContactForm && (
              <Card className="contact-form-card " ref={contactFormRef}>
                <Card.Body>
                  <ContactUsForm onSubmit={handleSubmitContactForm} />
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      )}
      
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your message has been submitted successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;

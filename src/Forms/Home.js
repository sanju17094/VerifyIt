import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GreetingPage.css";
import { useNavigate } from "react-router-dom";

const GreetingPage = () => {
  const navigate = useNavigate();


let index;
const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
const storedMapArray = JSON.parse(localStorage.getItem("map1"));
const map1 = new Map(storedMapArray);
console.log("map1 ka data", map1);
if (Array.isArray(sequenceArray)) {
  index = sequenceArray.indexOf("Personal Details");
} else {
  console.error("sequenceArrayData is not a valid array");
}
console.log("index of Personal Details:", index);

const handleNext = () => {
  const nextPage = sequenceArray[0];
  console.log("nextPage ki value", nextPage);
  const link = map1.get(nextPage);
  console.log("link next page ki", link);
  navigate(`/${link}`);
};
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
    >
      <Row>
        <Col className="text-center">
          <h1 className="display-4 mb-4">Welcome!</h1>
          <p className="lead mb-4">We are glad to have you here.</p>
          <Button variant="primary" size="lg" onClick={handleNext}>
            Get Started
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GreetingPage;

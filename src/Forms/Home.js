import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GreetingPage.css";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // ruko
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
    <div className="homepage">
      <main>
        <section className="home">
          <h2>Welcome to VerifyIt!</h2>
          <div className="home-content">
            <p>Your go-to platform for verification and authentication services. We ensure accuracy and reliability in all your important documents and data.</p>
          </div>
          <div className="buttons">
            <button className="btn1" onClick={handleNext}>Get Started</button>
            <Link to="/contact_us">
              <button className="btn2">Contact Us</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

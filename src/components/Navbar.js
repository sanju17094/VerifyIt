import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css'; 

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className="custom-brand">Document Verification</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 
// import logo from './assets/logo.png';

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className="custom-brand">
            <img
              // src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}VerifyIt
          </Navbar.Brand>
          <Nav className="ms-auto">
              <FontAwesomeIcon icon={faUser} className="user-icon"
               />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

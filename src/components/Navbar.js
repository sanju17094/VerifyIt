import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 
import logo from '../Assets/logo.jpeg';

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className="custom-brand">
          <div>           <img
              src={logo}
              width="50"
              height="50"
              className="logo"
            />
            {' '}VerifyIt
            </div>
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

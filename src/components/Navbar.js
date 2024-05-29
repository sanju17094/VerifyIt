
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpeg';


const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token2');
    localStorage.removeItem('user');
    navigate('/loginpage'); 
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className="custom-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            {' '}VerifyIt
          </Navbar.Brand>
          <Nav className="ms-auto">
            {user ? (
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} className="user-icon" />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#profile">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {user.first_name} {user.last_name}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#settings">
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <FontAwesomeIcon icon={faUser} className="user-icon" />
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

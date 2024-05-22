import React from 'react';
import { Nav } from 'react-bootstrap';

const SideNavbar = ({ setSection }) => {
  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
         activeKey="/home"
         onSelect={selectedKey => setSection(selectedKey)}
         style={{ height: '100vh', position: 'fixed', width: '250px' }}
    >
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link eventKey="workflow">Workflow Management</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="theme">Theme Switcher</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="fields">Fields Management</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="enquiry">Enquiry Message</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideNavbar;

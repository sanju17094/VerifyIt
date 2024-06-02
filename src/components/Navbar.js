import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpeg';

const { Item, Divider } = Menu;

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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/loginpage'); 
  };

  const menu = (
    <Menu>
      {user && (
        <>
          <Item key="profile">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            {user.first_name}
          </Item>
          <Divider />
          <Item key="settings">
            <FontAwesomeIcon icon={faCog} className="me-2" />
            Settings
          </Item>
          <Divider />
          <Item key="logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <nav className="custom-navbar">
        <div className="custom-brand">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          {' '}VerifyIt
        </div>
        <div className="ms-auto">
          {user ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
              </a>
            </Dropdown>
          ) : (
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

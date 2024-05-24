import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { RiUserLine } from 'react-icons/ri';

import { FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExampleIcon, faUser } from '@fortawesome/free-solid-svg-icons';
import logoImage from "../Khelo Indore Logo/Group 86.png";
import '../../src/MainLayout.css'
import { useSelector } from "react-redux";

const { Header, Sider, Content, Footer } = Layout;


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const themeColor = useSelector((state) => state.themeColor.changeColor);
  

  return (
    <Layout>
      <Sider
        className={`SideBar_${themeColor}`}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={`sidelogo_${themeColor}`}>
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">KI</span>
            <img src={logoImage} alt="Khelo Indore Logo" className="lg-logo" />
            <span className="lg-logo"></span>
          </h2>
        </div>
        <Menu
          className={`SideBar_${themeColor}`}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "dashboard",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <RiUserLine className="fs-4" />,
              label: "Users",
            },

            {
              key: "categories",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Categories",
            },
            {
              key: "venues",
              icon: <RiCouponLine className="fs-4" />,
              label: "Venues",
            },

            {
              key: "enquiries",
              icon: <FaQuestionCircle className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            {}

            <div className="d-flex gap-3 align-items-center dropdown">
              {}
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      marginRight: "5px",
                      color: "rgb(255, 95, 21)",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      padding: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  {}
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={handleLogout}
                  >
                    <LogoutOutlined style={{ marginRight: "8px" }} /> Logout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>

        {}
      </Layout>
    </Layout>
  );
};
export default MainLayout;

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { RiUserLine } from 'react-icons/ri';
import { RiLoginCircleLine } from 'react-icons/ri';
import { FaChalkboard } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { RiUserSearchLine } from 'react-icons/ri';
import { FaCalendarAlt , FaQuestionCircle} from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications, IoIosPerson } from 'react-icons/io';
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExampleIcon, faUser } from '@fortawesome/free-solid-svg-icons';
import logoImage from "../Khelo Indore Logo/Group 86.png";
import '../../src/MainLayout.css'

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

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="sidelogo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">KI</span>
            <img src={logoImage} alt="Khelo Indore Logo" className="lg-logo" />
            <span className="lg-logo"></span>
          </h2>
        </div>
        <Menu
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
              // children: [
              //   {
              //     key: "userprofile",
              //     icon: <RiLoginCircleLine className="fs-4" />,
              //     label: "User Login",
              //   },
              //   {
              //     key: "userlist",
              //     icon: <RiLoginCircleLine className="fs-4" />,
              //     label: "User's",
              //   },
              // ],
            },

            // {
            //   key: "adminlist",
            //   icon: <RiUserLine className="fs-4" />,
            //   label: "Admin",
            //   // children: [
            //   //   {
            //   //     key: "adduser",
            //   //     icon: <RiLoginCircleLine className="fs-4" />,
            //   //     label: "Add",
            //   //   },
            //   //   {
            //   //     key: "adminlist",
            //   //     icon: <RiAdminLine className="fs-4" />,
            //   //     label: "Admin List",
            //   //   },
            //   // ],
            // },

            {
              key: "categories",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Categories",
              // children: [
              //   {
              //     key: "category",
              //     icon: <AiOutlineShoppingCart className="fs-4" />,
              //     label: "Add Category",
              //   },
              // {
              //   key: "Subcategory",
              //   icon: <AiOutlineShoppingCart className="fs-4" />,
              //   label: "Add Subcategory",
              // },
              // {
              //   key: "category",
              //   icon: <BiCategoryAlt className="fs-4" />,
              //   label: "Category",
              // },
              // {
              //   key: "categorylist",
              //   icon: <BiCategoryAlt className="fs-4" />,
              //   label: "Category List",
              // },
              // {
              //   key: "subcategorylist",
              //   icon: <BiCategoryAlt className="fs-4" />,
              //   label: "Subcategory List",
              // },
              // {
              //   key: "list-color",
              //   icon: <AiOutlineBgColors className="fs-4" />,
              //   label: "Color List",
              // },
              //],
            },
            {
              key: "venues",
              icon: <RiCouponLine className="fs-4" />,
              label: "Venues",
              // children: [
              //   {
              //     key: "venue",
              //     icon: <ImBlog className="fs-4" />,
              //     label: "Add Venue",
              //   },
              //   {
              //     key: "venuelist",
              //     icon: <RiCouponLine className="fs-4" />,
              //     label: "Venue List",
              //   },
              // ],
            },
            {
              key: "coaches",
              icon: <FaBloggerB className="fs-4" />,
              label: "Coach",
              // children: [
              //   {
              //     key: "blog",
              //     icon: <ImBlog className="fs-4" />,
              //     label: "Add Blog",
              //   },
              //   {
              //     key: "blog-list",
              //     icon: <FaBloggerB className="fs-4" />,
              //     label: "Blog List",
              //   },
              //   {
              //     key: "blog-category",
              //     icon: <ImBlog className="fs-4" />,
              //     label: "Add Blog Category",
              //   },
              //   {
              //     key: "blog-category-list",
              //     icon: <FaBloggerB className="fs-4" />,
              //     label: "Blog Category List",
              //   },
              // ],
            },
            {
              key: "personal-training",
              icon: <FaChalkboard className="fs-4" />,
              label: "Personal Training",
            },
            {
              key: "events",
              icon: <FaCalendarAlt className="fs-4" />,
              label: "Events",
            },
            {
              key: "enquiries",
              icon:  <FaQuestionCircle className="fs-4" />,
              label: "Enquiries",
            }
            
            // {
            //   key: "",
            //   icon: <FaShoppingBag className="fs-4" />,
            //   label: "Shop",
            // },
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
            {/* <div className="position-relative">
              <Link to="/userprofile">
                <IoIosPerson className="fs-4" />
              </Link>

              <IoIosNotifications className="fs-4" />
              <span className="badge bg-danger rounded-circle p-1 position-absolute">
                3
              </span>
            </div> */}

            <div className="d-flex gap-3 align-items-center dropdown">
              {/* <div>
                <img src={logoImage} alt="Khelo Indore Logo" className="lg-logo" />
              </div> */}
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
                      marginRight: '5px',
                      color: 'rgb(255, 95, 21)',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      padding: '5px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/dashboard"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1" // Changed from Link to button
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={handleLogout}
                  >
                    Logout
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

        {/* <Footer className="footer">
          
          &copy; 2024 Khelo Indore. All rights reserved.
        </Footer> */}

      </Layout>
    </Layout>
  );
};
export default MainLayout;

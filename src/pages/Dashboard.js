import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // make sure to import useSelector from react-redux
import { BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import axios from "axios";
// import { API_URL } from '../ApiUrl';

const userColumns = [
  {
    title: 'S.No',
    dataIndex: 'key',
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'City',
    dataIndex: 'city',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (status ? "Approved" : "Pending"),
  },
];

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [userData, setUserData] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    axios.get(`http://localhost:8000/api/v1/Verifyit/user/get`)
      .then((response) => {
        const formattedUserData = response.data.data.map((user, index) => ({
          key: index + 1,
          name: `${user.first_name} ${user.last_name}`,
          mobile: user.mobile,
          email: user.email,
          gender: user.personal_details?.gender || 'N/A',
          city: user.personal_details?.location.city || 'N/A',
          status: user.status,  // Assuming the status is directly available in the user object
        }));
        setUserData(formattedUserData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetching counts (adjusted to ensure correct data access)
    axios.get(`http://localhost:8000/api/v1/Verifyit/user-count`)
      .then((response) => {
        const counts = response.data.data;  // Ensure accessing 'data' field correctly
        setUserCount(counts.totalUsers);
        setVenueCount(counts.trueStatusCount);
        setEventCount(counts.falseStatusCount);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
      });
  }, []);

  const data = [
    { type: "Jan", sales: 38 },
    { type: "Feb", sales: 52 },
    { type: "Mar", sales: 61 },
    { type: "Apr", sales: 145 },
    { type: "May", sales: 48 },
    { type: "Jun", sales: 38 },
    { type: "July", sales: 38 },
    { type: "Aug", sales: 38 },
    { type: "Sept", sales: 38 },
    { type: "Oct", sales: 38 },
    { type: "Nov", sales: 38 },
    { type: "Dec", sales: 38 },
  ];

  const themeColor = useSelector((state) => state.themeColor.changeColor);

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => (themeColor === 'white' ? 'black' : themeColor), // Set color conditionally based on theme color
    label: { position: "middle", style: { fill: "#FFFFFF", opacity: 1 } },
    xAxis: { label: { autoHide: true, autoRotate: false } },
    meta: { type: { alias: "Month" }, sales: { alias: "Income" } },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3 ">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Users</p>
            <h4 className="mb-0 sub-title">{userCount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowUpRight /> 5%
            </h6>
            <p className="mb-0 desc"> {currentDate}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">User Approved</p>
            <h4 className="mb-0 sub-title">{venueCount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowUpRight /> 5%
            </h6>
            <p className="mb-0 desc"> {currentDate}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">User Pending</p>
            <h4 className="mb-0 sub-title">{eventCount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 5%
            </h6>
            <p className="mb-0 desc">{currentDate}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className="mb-4 title">Registration</h3>
        </div>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Users</h3>
        <div>
          <Table
            columns={userColumns}
            dataSource={userData}
            pagination={{
              pageSizeOptions: ["5", "10", "20", "50"],
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

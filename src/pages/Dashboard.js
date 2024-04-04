import React, { useState, useEffect } from "react";
import { BsArrowUpRight, BsArrowUpLeft } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import { API_URL } from '../ApiUrl';



  const data = [
    {
      key: '1',
      name: 'John Doe',
      
    },
    {
      key: '2',
      name: 'Jane Smith',
    },
  ];

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status", 
  },
];

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [marchCount, setMarchCount] = useState(0);
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch today's date
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch counts from API
    axios.get(`${API_URL}/dashboard/count`)
      .then((response) => {
        setUserCount(response.data.userCount);
        setVenueCount(response.data.venueCount);
        setEventCount(response.data.eventCount);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
      });

      axios.get(`${API_URL}/users-count-per-month`)
      .then((response) => {
        const marchData = response.data.find(item => item.type === "Mar");
        if (marchData) {
          setMarchCount(marchData.sales);
        }
      })
      .catch((error) => {
        console.error("Error fetching March count:", error);
      });

    // Update counts and current date every day
    const interval = setInterval(() => {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      setCurrentDate(formattedDate);
      axios.get(`${API_URL}/dashboard/count`)
        .then((response) => {
          setUserCount(response.data.userCount);
          setVenueCount(response.data.venueCount);
          setEventCount(response.data.eventCount);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching counts:", error);
        });
    }, 86400000); // Update every 24 hours
    
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const data1 = [
    { key: '1', name: 'John Doe', product: 'Product A', status: 'Active' },
    { key: '2', name: 'Jane Smith', product: 'Product B', status: 'Inactive' },
    { key: '3', name: ' Doe', product: 'Product C', status: 'Active' },
    { key: '4', name: ' Smith', product: 'Product D', status: 'Active' },
    
  ];
  

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

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => "#ff5f15",
    label: { position: "middle", style: { fill: "#FFFFFF", opacity: 1 } },
    xAxis: { label: { autoHide: true, autoRotate: false } },
    meta: { type: { alias: "Month" }, sales: { alias: "Income" } },
  };

  return (
    <div>
    {/* <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <div onClick={() => navigate(-2)}>
        <FaArrowLeft size={30} />
        </div>
        </div> */}
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3 ">
        {/* Total User */}
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total User</p>
            <h4 className="mb-0 sub-title">{userCount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
            <BsArrowUpRight /> 5%
            </h6>
            <p className="mb-0 desc"> {currentDate}</p>
          </div>
        </div>
        {/* Total Venue */}
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Venue</p>
            <h4 className="mb-0 sub-title">{venueCount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowUpRight /> 5%
            </h6>
            <p className="mb-0 desc"> {currentDate}</p>
          </div>
        </div>
        {/* Total Event */}
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Event</p>
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
      {/* Registration */}
      <div className="mt-4">
        <h3 className="mb-5 title">Registration</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      {/* Recent Booking */}
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Booking</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
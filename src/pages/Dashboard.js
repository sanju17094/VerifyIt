import React, { useState, useEffect } from "react";
import { BsArrowUpRight} from "react-icons/bs";
// import { FaArrowLeft } from "react-icons/fa";
import { Column } from "@ant-design/plots";
import { Table, DatePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../ApiUrl';
const { RangePicker } = DatePicker;


const columns = [
  {
    title: "S.No",
    dataIndex: "key",
    render: (_, __, index) => index + 1,
  },
  {
    title: "First Name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Time of Booking",
    dataIndex: "key",
    // render: (_, __, index) => index + 1,
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "Booking ID",
    dataIndex: "Booking ID",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    render: date => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.getMonth() + 1;
      const year = formattedDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  },
  {
    title: "Booking",
    dataIndex: "status",
    render: (status) => (status ? "Accepted" : "Pending"),
  }
];


const visitor = [
  {
    title: 'S.No',
    dataIndex: 'key',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    render: date => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.getMonth() + 1;
      const year = formattedDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile',
  },
];



const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [marchCount, setMarchCount] = useState(0);
  const [visitorData, setVisitorData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
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

    // Per Month Count...
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
    
      // VISITOR...
      axios.get(`${API_URL}/dashboard/fetch-visitors`)
      .then(response => {
        const formattedVisitorData = response.data.data.map((item, index) => ({
          ...item,
          key: index + 1
      }));
      console.log(formattedVisitorData, ">>>>>>>>>>>>>>>>>>>VISITOR DATA")
      setVisitorData(formattedVisitorData);
    })
      .catch(error => {
        console.error('Error fetching visitor data:', error);
      });


      // Booking.....
      axios
      .get(`${API_URL}/user/getallUser`)
      .then((response) => {
        console.log(response.data.data, ">>>>>>>>>>>>>>>>>>BOOKING DATA");
        setBookingData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
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


  
  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
    console.log(dates, "<<<<<<<<<<<<<<<< Date");
  };

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className="mb-4 title">Registration</h3>
          <div>
            < RangePicker onChange={handleDateRangeChange} />
          </div>
        </div>
        <div>
          <Column {...config} />
        </div>
      </div>
      {/* Recent Booking */}
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Booking</h3>
        {/* <div>
          <Table columns={columns} dataSource={bookingData} />
        </div> */}
  <div>
    <Table
      columns={columns}
      dataSource={bookingData}
      pagination={{
        pageSizeOptions: ["5", "10", "20", "50"], // Available page sizes
        showSizeChanger: true, // Show the page size changer dropdown
        showQuickJumper: true, // Show quick jumper
      }}
    />
  </div>
      </div>
      {/* Recent Visitor */}
      <div className="mt-4">  
      <h3 className="mb-5 title">Recent Visitor</h3>
      <div>
      <Table columns={visitor} dataSource={visitorData} />
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
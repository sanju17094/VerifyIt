import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { Pagination, Tooltip, Popover, Input, Select } from "antd";
import { API_URL } from "../ApiUrl"; // Make sure this contains the correct API URL
import "../../src/Userlist.css"; // Make sure this path is correct

function UserList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    formatCsvData();
  }, [records]);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/v1/Verifyit/usersList/get?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        console.log("Fetched user data:", result.data);
        setRecords(result.data); // Update the records with the user data
      } else {
        console.error("Failed to fetch data:", result.error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const formatCsvData = () => {
    const formattedData = records.map((row) => ({
      "First Name": row.first_name,
      "Last Name": row.last_name,
      Email: row.email,
      Mobile: row.mobile,
      Status: row.status ? "Approved" : "Pending",
    }));

    setCsvData(formattedData);
  };

  const handleColumnFilter = (columnName, value) => {
    setCurrentPage(1);
    setSearchQuery("");
    const filteredData = records.filter((row) => row[columnName].toLowerCase().includes(value.toLowerCase()));
    setRecords(filteredData);
    setIsPopoverOpen(false); // Close popover after filtering
  };

  const { Option } = Select;

  const handleSearch = () => {
    setSearchQuery(searchText);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePagination = (page, pageSize) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = records.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h3 className="mb-4 title">Users</h3>
      <div className="cnt">
        <Form.Group as={Row} className="mb-3">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchInputChange}
              className="search-input"
            />
          </Col>
          <Col sm={6} className="d-flex justify-content-end">
            <Link to="/users/add">
              <Button variant="primary" className="mr-2">Add User</Button>
            </Link>
            <CSVLink data={csvData} filename={"user_list.csv"}>
              <Button variant="success">Download</Button>
            </CSVLink>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "7%" }}>S.No.</th>
                <th style={{ width: "15%" }}>
                  First Name
                  <Popover
                    placement="bottom"
                    title="Filter by First Name"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) => handleColumnFilter("first_name", e.target.value)}
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "15%" }}>
                  Last Name
                  <Popover
                    placement="bottom"
                    title="Filter by Last Name"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) => handleColumnFilter("last_name", e.target.value)}
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "20%" }}>
                  Email
                  <Popover
                    placement="bottom"
                    title="Filter by Email"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) => handleColumnFilter("email", e.target.value)}
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "15%" }}>
                  Mobile
                  <Popover
                    placement="bottom"
                    title="Filter by Mobile"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) => handleColumnFilter("mobile", e.target.value)}
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "10%" }}>
                  Status
                  <Popover
                    placement="bottom"
                    content={
                      <Select
                        placeholder="Select status"
                        onChange={(value) => handleColumnFilter("status", value)}
                        style={{ width: 190 }}
                      >
                        <Option value="all">All</Option>
                        <Option value="active">Approved</Option>
                        <Option value="inactive">Pending</Option>
                      </Select>
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "18%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers &&
                currentUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td
                      style={{
                        color: user.status ? "#4fd104" : "#ff0000",
                        fontWeight: "bold",
                      }}
                    >
                      {user.status ? "Approved" : "Pending"}
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <Link to={`/fieldmanagement/${user._id}`}>
                          <Button variant="success" className="view-more-button">View More</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          pageSizeOptions={["5", "10", "20", "50"]}
          showSizeChanger
          showQuickJumper
          total={records.length}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={handlePagination}
          onShowSizeChange={(current, size) => {
            setCurrentPage(1);
            setItemsPerPage(size);
          }}
        />
      </div>
    </>
  );
}

export default UserList;

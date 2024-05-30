import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { Pagination, Tooltip } from "antd";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import "../../src/Userlist.css";
import { API_URL } from "../ApiUrl";
import { Popover, Input, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

function UserList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [detailData, setDetailData] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    formatCsvData();
  }, [records]);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/v1/Verifyit/user/get?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        console.log("ye data venue ki list ka hai...", result.data);
        setRecords(result.data); // Update to setRecords(result.venue)
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
      "Venue Name": row.name,
      Category: row.category,
      Status: row.status ? "Active" : "Inactive",
    }));

    setCsvData(formattedData);
  };

  const generatePdfContent = (rowData) => (
    <Document>
      <Page>
        <Text>Venue Name: {rowData.name}</Text>
        <Text>Address: {rowData.address}</Text>
        <Text>State: {rowData.state}</Text>
        <Text>City: {rowData.city}</Text>
        <Text>Zipcode: {rowData.zipcode}</Text>
        <Text>Amenities: {rowData.amenities}</Text>
        <Text>Activities: {rowData.activities}</Text>
        <Text>Category: {rowData.category}</Text>
      </Page>
    </Document>
  );

  const handlePdf = async (row) => {
    console.log("Info clicked for row:", row);
    try {
      // Fetch detail data
      const detailResponse = await fetch(
        `${API_URL}/user/fetch-user-by-id/${row._id}`
      );
      const detailResult = await detailResponse.json();
      if (detailResponse.ok) {
        setDetailData(detailResult.data);
        setPdfContent(generatePdfContent(detailResult.data));
      } else {
        console.error("Failed to fetch detail data:", detailResult.error);
      }
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }
  };

  const handleColumnFilter = (columnName, value) => {
    setCurrentPage(1);
    setSearchQuery("");
    if (columnName === "status") {
      if (value === "all") {
        fetchData();
      } else {
        const filteredData = records.filter((row) => {
          if (value === "active") {
            return row.status === true;
          } else if (value === "inactive") {
            return row.status === false;
          }
          return true;
        });
        setRecords(filteredData);
      }
    } else {
      // Handle filtering for other columns if needed
      const filteredData = records.filter((row) =>
        row[columnName].toLowerCase().includes(value.toLowerCase())
      );
      setRecords(filteredData);
    }

    setIsPopoverOpen(false); // Close popover after filtering
  };

  const { Option } = Select;

  const handleInfo = async (row) => {
    console.log("Info clicked for row:", row);
    try {
      // Fetch detail data
      const detailResponse = await fetch(
        `${API_URL}/venue/individual/${row._id}`
      );
      const detailResult = await detailResponse.json();
      if (detailResponse.ok) {
        setDetailData(detailResult.data);
      } else {
        console.error("Failed to fetch detail data:", detailResult.error);
      }
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }
  };

  const handleEdit = async (venue) => {
    console.log("Edit clicked for row:", venue);
    try {
      const response = await fetch(`${API_URL}/venue/individual/${venue._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: venue.name,
          address: venue.address,
          state: venue.state,
          zipcode: venue.zipcode,
          city: venue.city,
          amenities: venue.amenities,
          category: venue.category,
          activities: venue.activities,
          images: venue.images,
          status: venue.status,
        }),
      });

      if (response.ok) {
        console.log("Category name updated successfully");
      } else {
        const responseData = await response.json();
        console.error(
          "Failed to update category name:",
          responseData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error updating category name:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/venue/delete/${row._id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire("Deactivated!", "Venue has been Inactivate.", "success");
        fetchData(); // Refresh data after deletion
      } else {
        console.error("Failed to delete venue:", response.statusText);
        Swal.fire("Error", "Failed to delete venue.", "error");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the venue.",
        "error"
      );
    }
  };

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
  const currentVenues = records.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <>
      <h3 className="mb-4 title">Venues</h3>
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
            <Link to="/venues/add">
              <button className="add-button mr-2">Add Venue</button>
            </Link>
            <CSVLink data={csvData} filename={"venue_list.csv"}>
              <button className="down-button">Download</button>
            </CSVLink>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "7%" }}>S.No.</th>
                <th style={{ width: "22%" }}>
                   Name{" "}
                  <Popover
                    placement="bottom"
                    title="Filter by Venue Name"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) =>
                          handleColumnFilter("name", e.target.value)
                        }
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "22%" }}>
                  Mobile{" "}
                  <Popover
                    placement="bottom"
                    title="Filter by Category"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) =>
                          handleColumnFilter("category", e.target.value)
                        }
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "22%" }}>
                  Email{" "}
                  <Popover
                    placement="bottom"
                    title="Filter by Address"
                    content={
                      <Input
                        placeholder="Search..."
                        onChange={(e) =>
                          handleColumnFilter("address", e.target.value)
                        }
                      />
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "10%" }}>
                  Status{" "}
                  <Popover
                    placement="bottom"
                    content={
                      <Select
                        placeholder="Select status"
                        onChange={(value) =>
                          handleColumnFilter("status", value)
                        }
                        style={{ width: 190 }}
                      >
                        <Option value="all">All</Option>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    }
                    trigger="click"
                  >
                    <FilterOutlined style={{ cursor: "pointer" }} />
                  </Popover>
                </th>
                <th style={{ width: "15%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVenues &&
                currentVenues.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email}</td>
                    <td
                      style={{
                        color: user.status ? "#4fd104" : "#ff0000",
                        fontWeight: "bold",
                      }}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        
                        <Link
                          to={`/venues/edit/${user._id}`}
                          style={{ marginRight: "5px" }}
                        >
                          <EditOutlined
                            style={{
                              fontSize: "20px",
                              color: "#fcfcfa",
                              borderRadius: "5px",
                              padding: "5px",
                              backgroundColor: "#3d9c06",
                            }}
                            onClick={() => handleEdit(user)}
                          />
                        </Link>
                        
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          pageSizeOptions={["5", "10", "20", "50"]} // Available page sizes
          showSizeChanger={true} // Show the page size changer dropdown
          showQuickJumper={true} // Show quick jumper
          total={records.length} // Total number of items
          pageSize={itemsPerPage} // Items per page
          current={currentPage} // Current page
          onChange={handlePagination}
          onShowSizeChange={(current, size) => {
            setCurrentPage(1); // Reset to first page when changing page size
            setItemsPerPage(size); // Update items per page
          }}
        />
      </div>
    </>
  );
}

export default UserList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Table, Form, Row, Col, Button } from "react-bootstrap"; // Import Bootstrap components
import { ColorRing } from "react-loader-spinner";
import "../../src/Userlist.css";
import { CSVLink } from "react-csv";
import { API_URL } from "../ApiUrl";

function EventList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    formatCsvData();
  }, [data]);

  const fetchData = async () => {
    try {
      // Replace the URL with your actual API endpoint
      const apiUrl = `${API_URL}/event/fetchAll?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log("result.....->>>", result);
      if (response.ok) {
        setData(result.data);
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
    const formattedData = data.map((row) => ({
      Name: row.event_name,
      "Start At": row.start_date,
      "End At": row.end_date,
      Location: row.location,
      Status: row.status ? "Active" : "Inactive",
    }));

    setCsvData(formattedData);
  };

  const handleEdit = async (row) => {
    console.log("Edit clicked for row:", row);
    try {
      const response = await fetch(`${API_URL}/event/get/${row._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name: data.event_name,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          location: data.location,
          status: data.status,
        }),
      });

      if (response.ok) {
        console.log("event name updated successfully");
      } else {
        const responseData = await response.json();
        console.error(
          "Failed to update event name:",
          responseData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error updating event name:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/event/delete/${row._id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire(
          "Deactivated!",
          "Your Profile has been Deactivated.",
          "success"
        );
        // Update your state or refetch data to reflect the deletion
        fetchData();
      } else {
        console.error("Failed to delete event:", response.statusText);
        Swal.fire("Error", "Failed to delete event.", "error");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the event.",
        "error"
      );
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchText);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((row) =>
      row.event_name.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <h3 className="mb-4 title">Events</h3>
      <div className="cnt">
        <Form.Group as={Row} className="mb-3">
          <Col xs={12} sm={6}>
            <Form.Control
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </Col>
          <Col sm={6} className="d-flex justify-content-end align-items-center">
            <div className="mr-2">
              <Link to="/event/add">
                <button className="add-button">Add Events</button>
              </Link>
            </div>
            <div>
              <CSVLink data={csvData} filename={"user_list.csv"}>
                <Button
                  className="down-button"
                >
                  Download
                </Button>
              </CSVLink>
            </div>
          </Col>
        </Form.Group>
        <div className="table-container">
          {loading ? (
            <div className="text-center">
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
              <p>Loading...</p>
            </div>
          ) : (
            <Table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "7%" }}>S.No.</th>
                  <th style={{ width: "32%" }}>Name</th>
                  <th style={{ width: "10%" }}>Start At</th>
                  <th style={{ width: "10%" }}>End At</th>
                  <th style={{ width: "10%" }}>Location</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "7%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={row._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{row.event_name}</td>
                    <td>{formatDate(row.start_date)}</td>
                    <td>{formatDate(row.end_date)}</td>
                    <td>{row.location}</td>
                    <td
                      style={{
                        color: row.status ? "#4fd104" : "#ff0000",
                        fontWeight: "bold",
                      }}
                    >
                      {row.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <Link
                          to={`/event/edit/${row._id}`}
                          style={{ marginLeft: "1%" }}
                        >
                          <EditOutlined
                            style={{
                              fontSize: "20px",
                              color: "#fcfcfa",
                              borderRadius: "5px",
                              padding: "5px",
                              backgroundColor: "#3d9c06",
                            }}
                            onClick={() => handleEdit(row)}
                          />
                        </Link>
                        <DeleteOutlined
                          style={{
                            fontSize: "20px",
                            color: "#E7F3FF",
                            borderRadius: "5px",
                            padding: "5px",
                            backgroundColor: "#ff5f15",
                            marginLeft: "5px",
                          }}
                          onClick={() => handleDelete(row)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div className="pagination-container">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePagination(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default EventList;

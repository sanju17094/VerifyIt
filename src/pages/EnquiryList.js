import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Table, Form, Row, Col, Button } from "react-bootstrap"; // Import Bootstrap components
import { ColorRing } from "react-loader-spinner";
import "../../src/Userlist.css";
import { API_URL } from "../ApiUrl";

function Enquirylist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    try {
      // Replace the URL with your actual API endpoint
      const apiUrl = `${API_URL}/contactUs/fetchAll?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log(result.data, "result ka data hai");

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
      row.first_name.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h3 className="mb-4 title">Enquiries</h3>
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
          {/* <Col sm={6} className="d-flex justify-content-end">
                        <Link to="/enquiry/add">
                            <button className="add-button mr-2">Add Enquiry</button>
                        </Link>
                    </Col> */}
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
                  <th style={{ width: "14%" }}>Name</th>
                  <th style={{ width: "17%" }}>Email</th>
                  <th style={{ width: "17%" }}>Phone Number</th>
                  <th style={{ width: "15%" }}>Subject</th>
                  <th style={{ width: "30%" }}>Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={row._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{row.first_name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.subject}</td>
                    <td>
                      {row.comments.length > 30 ? (
                        <>
                          {`${row.comments.substring(0, 30)}... `}
                          <span
                            style={{
                              color: "black",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              Swal.fire({
                                title: "Comment",
                                text: row.comments,
                              });
                            }}
                          >
                            View More
                          </span>
                        </>
                      ) : (
                        row.comments
                      )}
                    </td>
                    <td>
                      {/* <div style={{ display: 'flex' }}>
                                            <Link to={`/enquiry/details/${row._id}`} style={{ marginLeft: '1%' }}>
                                                <EyeOutlined
                                                    style={{
                                                        fontSize: '20px',
                                                        color: '#fcfcfa',
                                                        borderRadius: '5px',
                                                        padding: '5px',
                                                        backgroundColor: '#3d9c06',
                                                    }}
                                                    onClick={() => handleEdit(row)}
                                                />
                                            </Link>

                                            <DeleteOutlined
                                                style={{
                                                    fontSize: '20px',
                                                    color: '#E7F3FF',
                                                    borderRadius: '5px',
                                                    padding: '5px',
                                                    backgroundColor: '#ff5f15',
                                                    marginLeft: '5px',
                                                }}
                                                onClick={() => handleDelete(row)}
                                            />

                                        </div> */}
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

export default Enquirylist;

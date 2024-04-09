import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { ColorRing } from 'react-loader-spinner';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
//import '../../Userlist.css';
import { API_URL } from '../ApiUrl';

function PersonalTraininglist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    try {
      const apiUrl = `${API_URL}/PersonalTraining/fetchAll`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        console.error('Failed to fetch data:', result.error);
      }

      setLoading(false);
    } catch (error) {
      //console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (row) => {
    try {
      const response = await fetch(`${API_URL}/PersonalTraining/fetch/${row._id}`);
      if (response.ok) {
        const data = await response.json();
        // Assuming the response data contains the necessary fields for editing
        // Update state or navigate to the edit page with the fetched data
        console.log('Fetched data for editing:', data);
      } else {
        console.error('Failed to fetch data for editing:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data for editing:', error);
    }
  };

  const handleDeactivate = async (row) => {
    try {
      // Construct the API endpoint URL for deactivating the personal training item
      const apiUrl = `${API_URL}/PersonalTraining/deactive/${row._id}`;

      // Send a POST request to the endpoint
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // You may optionally include a request body if required by your backend
        // body: JSON.stringify({ /* any data to be sent to the server */ }),
      });

      if (response.ok) {
        // If the response is successful, display a success message
        Swal.fire('Deactivated!', 'Personal Training has been deactivated.', 'success');
        // Fetch updated data after deactivation
        fetchData();
      } else {
        // If there's an error response, log the error message
        console.error('Failed to deactivate Personal Training:', response.statusText);
        // Display an error message to the user
        Swal.fire('Error', 'Failed to deactivate Personal Training.', 'error');
      }
    } catch (error) {
      // If an exception occurs during the request, log the error and display an error message
      console.error('Error deactivating Personal Training:', error);
      Swal.fire('Error', 'An error occurred while deactivating the Personal Training.', 'error');
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchText);
    setCurrentPage(1);
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
    .filter((row) => row.trainer_name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h3 className="mb-4 title">Personal Training</h3>
      <div className="cnt">
        <Form.Group as={Row} className="mb-3">
          <Col sm={6}>
            <Form.Control
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </Col>
          <Col sm={6} className="d-flex justify-content-end">
            <Link to="/personal-traning/add">
              <button className="add-button mr-2">Add Personal Trainer</button>
            </Link>
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
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
              <p>Loading...</p>
            </div>
          ) : (
            <Table className='custom-table'>
              <thead>
                <tr>
                  <th style={{ width: '7%' }}>S.No.</th>
                  <th style={{ width: '25%' }}>Trainer Name</th>
                  <th style={{ width: '15%' }}>Duration</th>
                  <th style={{ width: '15%' }}>Focus Area</th>
                  <th style={{ width: '10%' }}>Price</th>
                  <th style={{ width: '8%' }}>Status</th>
                  <th style={{ width: '5%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={row._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{row.trainer_name}</td>
                    <td>{row.duration}</td>
                    <td>{row.focus_area.join(', ')}</td>
                    <td>{row.price}</td>
                    <td style={{ color: row.status ? "#4fd104" : "#ff0000", fontWeight: "bold" }}>
                    {row.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <Link to={`/personal-training/edit/${row._id}`} style={{ marginLeft: '1%' }}>
                          <EditOutlined
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
                        {/* Change onClick event to call handleDeactivate */}
                        <DeleteOutlined
                          style={{
                            fontSize: '20px',
                            color: '#E7F3FF',
                            borderRadius: '5px',
                            padding: '5px',
                            backgroundColor: '#ff5f15',
                            marginLeft: '5px',
                          }}
                          onClick={() => handleDeactivate(row)}
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
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePagination(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PersonalTraininglist;

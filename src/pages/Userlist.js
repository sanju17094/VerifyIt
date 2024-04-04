import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import '../../src/Userlist.css';
import { API_URL } from '../ApiUrl';

function Userlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    try {
      const apiUrl = `${API_URL}/user/getallUser?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        console.error('Failed to fetch data:', result.error);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (row) => {
    console.log('Edit clicked for row:', row);
    try {
      const response = await fetch(`${API_URL}/super-admin/update-user/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        console.log('User name updated successfully');
      } else {
        const responseData = await response.json();
        console.error('Failed to update User name:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating User name:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/user/delete/${row._id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire('Deactivated!', 'Your Profile has been Inactivated.', 'success');
        fetchData();
      } else {
        console.error('Failed to delete User:', response.statusText);
        Swal.fire('Error', 'Failed to delete User.', 'error');
      }
    } catch (error) {
      console.error('Error deleting User:', error);
      Swal.fire('Error', 'An error occurred while deleting the User.', 'error');
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
    .filter((row) => row.first_name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

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
              className='search-input'
            />
          </Col>
          <Col sm={6} className="d-flex justify-content-end">
            <div>
              <Link to="/users/add">
                <button className="add-button">Add User</button>
              </Link>
            </div>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '7%' }}>S.No.</th>
                <th style={{ width: '30%' }}>First Name</th>
                <th style={{ width: '30%' }}>Last Name</th>
                <th style={{ width: '20%' }}>Role</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '7%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <React.Fragment key={row._id}>
                  <tr>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.role}</td>
                    <td>{row.status ? 'Active' : 'Inactive'}</td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <Link to={`/UpdateUser/${row._id}`} style={{ marginLeft: '1%' }}>
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
                      </div>
                    </td>
                  </tr>
                  {/* <tr>
                    <td colSpan="6">Additional row after each entry</td>
                  </tr> */}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {currentItems.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>No data available</p>
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

export default Userlist;

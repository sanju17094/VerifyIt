import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Table, Form, Row, Col, Button } from 'react-bootstrap'; // Import Bootstrap components
import '../../src/Userlist.css';
import { API_URL } from '../ApiUrl';


function Categorylist() {
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
      // Replace the URL with your actual API endpoint
      const apiUrl = `${API_URL}/fetch-all-coaches?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log(result)

      if (response.ok) {
        setData(result.coaches);

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
      const response = await fetch(`${API_URL}/update-coach/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      });

      if (response.ok) {
        console.log('Category name updated successfully');
      } else {
        const responseData = await response.json();
        console.error('Failed to update category name:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating category name:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/delete-coach/${row._id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        // Update your state or refetch data to reflect the deletion
        fetchData();
      } else {
        console.error('Failed to delete category:', response.statusText);
        Swal.fire('Error', 'Failed to delete category.', 'error');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire('Error', 'An error occurred while deleting the category.', 'error');
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
    .filter((row) => row.first_name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h3 className="mb-4 title">Coach</h3>
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
          <Col sm={6} className="d-flex justify-content-end">
            <Link to="/coaches/add">
              <button className="add-button mr-2">Add Coach</button>
            </Link>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className='custom-table'>
            <thead>
              <tr>
                <th style={{ width: '7%' }}>S.No.</th>
                <th style={{ width: '13%' }}>First Name</th>
                <th style={{ width: '13%' }}>Last Name</th>
                <th style={{ width: '13%' }}>Location</th>
                <th style={{ width: '13%' }}>Specializations</th>
                <th style={{ width: '13%' }}>Experience(yr)</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '7%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row._id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{`${row.location.address}, ${row.location.city}, ${row.location.state}`}</td>
                  <td>{row.specializations.join(', ')}</td>
                  <td>{row.experience}</td>
                  <td>{row.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <Link to={`/coaches/edit/${row._id}`} style={{ marginLeft: '1%' }}>
                        <EditOutlined
                          style={{
                            fontSize: '20px',
                            color: '#fcfcfa',
                            borderRadius: '5px',
                            padding: '5px',
                            backgroundColor: '#ff5f15',
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
                          backgroundColor: '#3d9c06',
                          marginLeft: '5px',
                        }}
                        onClick={() => handleDelete(row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default Categorylist;

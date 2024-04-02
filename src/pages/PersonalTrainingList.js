import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table, Form, Row, Col, Button } from 'react-bootstrap'; 
import '../../src/Userlist.css';
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
      // Replace the URL with your actual API endpoint
      const apiUrl = `${API_URL}/PersonalTraining/fetch?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        setData(result.categories);
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
      const response = await fetch(`${API_URL}/Personal Training/update/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          PersonalTraining_name: data.PersonalTraining_name
        })
      });

      if (response.ok) {
        console.log('Personal Training name updated successfully');
      } else {
        const responseData = await response.json();
        console.error('Failed to update Personal Training name:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating Personal Training name:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/Personal Training/delete/${row._id}`;

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
        console.error('Failed to delete Personal Training:', response.statusText);
        Swal.fire('Error', 'Failed to delete Personal Training.', 'error');
      }
    } catch (error) {
      console.error('Error deleting Personal Training:', error);
      Swal.fire('Error', 'An error occurred while deleting the Personal Training.', 'error');
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
    .filter((row) => row.PersonalTraining_name.toLowerCase().includes(searchText.toLowerCase()))
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
            <Link to="/categories/add">
              <button className="add-button mr-2">Add PT</button>
            </Link>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className='custom-table'>
            <thead>
              <tr>
                <th style={{ width: '7%' }}>S.No.</th>
                <th style={{ width: '62%' }}>Name</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '7%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row._id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{row.PersonalTraining_name}</td>
                  <td>{row.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <Link to={`/categories/edit/${row._id}`} style={{ marginLeft: '1%' }}>
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

export default PersonalTraininglist;

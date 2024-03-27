import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import '../../src/Userlist.css';

function VenueList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  useEffect(() => {
    fetchData();
  }, [currentPage, searchText]);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/getVenue?page=${currentPage}&limit=${itemsPerPage}&search=${searchText}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        setRecords(result.venue); // Update to setRecords(result.venue)
      } else {
        console.error('Failed to fetch data:', result.error);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (venue) => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/update/${venue._id}`; // Replace with your actual API endpoint for editing
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Send data to update here
          name: 'Updated Venue Name', // Example: Updated venue name
          category: ['Updated Category'], // Example: Updated category name
          // Add other fields as needed
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire('Updated!', 'Venue updated successfully.', 'success');
        fetchData(); // Refresh data after updating
      } else {
        console.error('Failed to update venue:', result.error);
        Swal.fire('Error', 'Failed to update venue.', 'error');
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      Swal.fire('Error', 'An error occurred while updating the venue.', 'error');
    }
  };
  
  const handleDelete = async (venue) => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/delete/${venue._id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire('Deleted!', 'Venue deleted successfully.', 'success');
        fetchData(); // Refresh data after deletion
      } else {
        console.error('Failed to delete venue:', response.statusText);
        Swal.fire('Error', 'Failed to delete venue.', 'error');
      }
    } catch (error) {
      console.error('Error deleting venue:', error);
      Swal.fire('Error', 'An error occurred while deleting the venue.', 'error');
    }
  };

  const handleSearch = () => {
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
  const currentVenues = records.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h3 className="mb-4 title">Venues</h3>
      <div className="cnt">
        <Form.Group as={Row} className="mb-3">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Search by Venue Name"
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </Col>
          <Col sm={6} className="d-flex justify-content-end">
            <Link to="/venues/add">
              <Button className="add-button mr-2">Add Venue</Button>
            </Link>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className='custom-table'>
            <thead>
              <tr>
                <th style={{ width: '5%' }}>S.No.</th>
                <th style={{ width: '62%' }}>Venue Name</th>
                <th style={{ width: '23%' }}>Category</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVenues.map((venue, index) => (
                <tr key={venue._id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{venue.name}</td>
                  <td>{venue.category.join(', ')}</td> 
                  <td>
                    <div style={{ display: 'flex' }}>
                      <Link to={`/venues/edit/${venue._id}`} style={{ marginRight: '5px' }}>
                      <EditOutlined
                          style={{
                            fontSize: '20px',
                            color: '#fcfcfa',
                            borderRadius: '5px',
                            padding: '5px',
                            backgroundColor: '#ff5f15',
                          }}
                          onClick={() => handleEdit(venue)}
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
                        onClick={() => handleDelete(venue)}
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
            {Array.from({ length: Math.ceil(records.length / itemsPerPage) }).map((_, index) => (
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

export default VenueList;

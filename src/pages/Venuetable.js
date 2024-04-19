import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { CSVLink } from 'react-csv';
import { Pagination } from 'antd';
import '../../src/Userlist.css';
import { API_URL } from '../ApiUrl';

function VenueList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    formatCsvData();
  }, [records]);
  

  const fetchData = async () => {
    try {
      const apiUrl = `${API_URL}/venue/getVenue?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
         console.log("ye data venue ki list ka hai...",result.venue)
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

  const formatCsvData = () => {
    const formattedData = records.map(row => ({
      "Venue Name": row.name,
      "Category": row.category,
      "Status": row.status ? "Active" : "Inactive"
    }));
  
    setCsvData(formattedData);
  };
  
  const handleEdit = async (venue) => {
    console.log('Edit clicked for row:', venue);
    try {
      const response = await fetch(`${API_URL}/venue/edit/${venue._id}`, {
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


  // const handleEdit = async (venue) => {
  //   console.log('Edit clicked for row:', venue);
  //   try {
  //     // const apiUrl = `${API_URL}/venue/individual/${venue._id}`; 
  //     // const apiUrl = await axios.get(`${API_URL}/venue/individual/${venue._id}`);
  //     const apiUrl = `${API_URL}/venue/edit/${venue._id}`; 
  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         activities: records.activities,
  //         address: records.address,
  //         amenities: records.amenities,
  //         category: records.category,
  //         city: records.city,
  //         name: records.name,
  //         state: records.state,
  //         zipcode: records.zipcode,
  //         status: records.status, 
  //       }),
  //     });
  
  //     const result = await response.json();
  
  //     if (response.ok) {
  //     //  Swal.fire('Updated!', 'Venue updated successfully.', 'success');
  //       fetchData(); // Refresh data after updating
  //     } else {
  //       console.error('Failed to update venue:', result.error);
  //       Swal.fire('Error', 'Failed to update venue.', 'error');
  //     }
  //   } catch (error) {
  //     console.error('Error updating venue:', error);
  //     Swal.fire('Error', 'An error occurred while updating the venue.', 'error');
  //   }
  // };
  
  const handleDelete = async (row) => {
    try {
      const apiUrl = `${API_URL}/venue/delete/${row._id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire('Deactivated!', 'Venue has been Inactivate.', 'success');
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
            <CSVLink data={csvData} filename={"user_list.csv"}>
                <button
                 
                  className="down-button"
                >
                  Download 
                </button>
              </CSVLink>
          </Col>
        </Form.Group>
        <div className="table-container">
          <Table className='custom-table'>
            <thead>
              <tr>
                <th style={{ width: '7%' }}>S.No.</th>
                <th style={{ width: '52%' }}>Venue Name</th>
                <th style={{ width: '23%' }}>Category</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '7%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVenues.map((venue, index) => (
                <tr key={venue._id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{venue.name}</td>
                  <td>{venue.category}</td>
                  <td style={{ color: venue.status ? "#4fd104" : "#ff0000", fontWeight: "bold" }}>
                  {venue.status ? "Active" : "Inactive"}
                  </td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <Link to={`/venues/edit/${venue._id}`} style={{ marginRight: '5px' }}>
                      <EditOutlined
                          style={{
                            fontSize: '20px',
                            color: '#fcfcfa',
                            borderRadius: '5px',
                            padding: '5px',
                            backgroundColor: '#3d9c06',
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
                          backgroundColor: '#ff5f15', 
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

export default VenueList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons'; // Added ArrowLeftOutlined
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../src/Userlist.css';

function VenueList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10; // Adjust as needed
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    try {
      const apiUrl = `https://api-kheloindore.swapinfotech.com/api/v1/kheloindore/venue/getVenue?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await axios.get(apiUrl);
  
      if (response.status === 200) {
        // Update the state with venue details including category name
        setRecords(response.data.venue.map(venue => ({
          ...venue,
          categoryName: venue.category, // Assuming category_name is the field in category object
        })));
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  const handleDelete = async (row) => {
    try {
      const apiUrl = `https://api-kheloindore.swapinfotech.com/api/v1/kheloindore/venue/delete/${row._id}`;
  
      const response = await axios.delete(apiUrl);
  
      if (response.status === 200) {
        Swal.fire('Deleted!', 'Venue deleted successfully.', 'success');
        fetchData(); // Assuming fetchData function is defined elsewhere to refresh venue data
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
    const filteredData = records.filter((row) =>
      row.category_name.toLowerCase().includes(searchText.toLowerCase())
      
    );
    console.log(filteredData,"<filteredData")
    setRecords(filteredData);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    handleSearch();
  };

  

  const columns = [
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>S.No.</span>,
      selector: (_, index) => index + 1 + (currentPage - 1) * itemsPerPage,
      width: '10%'
    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Venue Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Category</span>,
      selector: (row) => row.category_name, 
    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Action</span>,
      width: '12%',
      cell: (row) => (
        <div style={{ display: 'flex' }}>
          <Link to={`/UpdateVenue/${row._id}`}  style={{ marginLeft: '1%' }}>
            <EditOutlined style={{ fontSize: '20px', color: '#fcfcfa', borderRadius: '5px', padding: '5px', backgroundColor: '#ff5f15' }}  />
          </Link>
          <DeleteOutlined style={{ fontSize: '20px', color: '#E7F3FF', borderRadius: '5px', padding: '5px', backgroundColor: '#3d9c06', marginLeft: '5px' }} onClick={() => handleDelete(row)} />
        </div>
      ),
    },
  ];
  
  return (
    <>
      <Link to="/venues/add">
        <button className="add-button mr-2">Add Venue</button>
      </Link>
      <h3 className="mb-4 title">
        Venues
      </h3>
      <div className="cnt">
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationPerPage={itemsPerPage}
          paginationRowsPerPageOptions={[5, 10, 20]}
          paginationTotalRows={records.length}
          progressPending={loading}
          onChangePage={(page) => setCurrentPage(page)}
          noHeader
          highlightOnHover
          subHeader
          subHeaderComponent={(
            <Row className="justify-content-end align-items-center">
              <Col xs={12} sm={6}>
                <Form.Control
                  type="text"
                  className="searchInput"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchInputChange}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xs={10} sm={2}>
              </Col>
            </Row>
          )}
          subHeaderAlign="right"
        />
      </div>
    </>
  );
}

export default VenueList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/getVenue?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setRecords(response.data.venue);
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/delete/${row._id}`;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        fetchData(); 
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
      name: 'S.No.',
      selector: (_, index) => index + 1 + (currentPage - 1) * itemsPerPage,
    },
    {
      name: 'Venue Name',
      selector: (row) => row.name,
    },
    {
      name: 'Category',
      selector: (row) => row.category_name,
    },
    {
      name: 'Sub Category',
      selector: (row) => row.sub_category,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Space size="middle">
          <Link to={`/UpdateVenue/${row._id}`}>
            <Button type="link">
              <EditOutlined />
            </Button>
          </Link>
          <Button type="link" onClick={() => handleDelete(row)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
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
            <Link to="/Venue"><button className="add-button mr-2">Add Venue</button>
              </Link>
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

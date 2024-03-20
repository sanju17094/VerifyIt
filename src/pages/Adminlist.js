import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../src/Userlist.css';

function Adminlist() {
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
      // Replace the URL with your actual API endpoint
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/admin/fetch?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      if (response.ok) {
        setData(result.data); 
        console.log(result.data.first_name, ">>>>>>>>>>>>");
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
      const response = await fetch(`http://localhost:4000/api/v1/kheloindore/admin/update/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      });

      if (response.ok) {
        console.log('Admin name updated successfully');
      } else {
        const responseData = await response.json();
        console.error('Failed to update Admin name:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating admin name:', error);
    }
  };


  const handleDelete = async (row) => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/admin/delete/${row._id}`;
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
        console.error('Failed to delete admin:', response.statusText);
        Swal.fire('Error', 'Failed to delete admin.', 'error');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      Swal.fire('Error', 'An error occurred while deleting the admin.', 'error');
    }
  };


  
  

  const handleSearch = () => {
    const filteredData = data.filter((row) =>
      row.first_name.toLowerCase().includes(searchText.toLowerCase())
      
    );
    console.log(filteredData,"<filteredData")
    setData(filteredData);
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
      name: 'First Name',
      selector: (row) => row.first_name,
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
    },
    {
        name: 'Email Address',
        selector: (row) => row.email,
      },
      {
        name: 'Role',
        selector: (row) => row.role,
      },
    {
      name: 'Status',
      selector: (row) => row.status ? 'Active' : 'Inactive',
    },
    {
      name: 'Action',
      cell: (row) => (
        <Space size="middle">
          <Link to={`/UpdateAdmin/${row._id}`}>
            <Button type="link" onClick={() => handleEdit(row)}>
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
    <h1>Admin List</h1>
      <div className="cnt">
        <DataTable
          className="dataTable"
          columns={columns}
          data={data}
          pagination
          paginationPerPage={itemsPerPage}
          paginationRowsPerPageOptions={[5, 10, 20]}
          paginationTotalRows={data.length}
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
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchInputChange}
                  className="searchInput"
                  style={{ width: '120%' }}
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

export default Adminlist;

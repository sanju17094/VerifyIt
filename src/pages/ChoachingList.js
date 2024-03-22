import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Table, Popconfirm } from "antd";
import '../../src/Userlist.css';

function Shoplist() {
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/category/fetch?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
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
      const response = await fetch(`http://localhost:4000/api/v1/kheloindore/category/update/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_name: data.category_name
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/category/delete/${row._id}`;

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
    const filteredData = data.filter((row) =>
      row.category_name.toLowerCase().includes(searchText.toLowerCase())

    );
    console.log(filteredData, "<filteredData")
    setData(filteredData);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    handleSearch();
  };

  const columns = [
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>S.No.</span>,
      selector: (_, index) => index + 1 + (currentPage - 1) * itemsPerPage,
      editable: true,
      width: '10%',

    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Name</span>,
      selector: (row) => row.category_name,
      editable: true,
      width: '70%',
    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Status</span>,
      selector: (row) => row.status ? 'Active' : 'Inactive',
      editable: true,
      width: '10%',
    },
    {
      name: <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Action</span>,
      width: '10%',
      editable: true,
      cell: (row) => (
        <div style={{ display: 'flex' }}>
          <Link to={`/UpdateCategory/${row._id}`} style={{ marginLeft: '1%' }}>
            <EditOutlined style={{ fontSize: '20px', color: '#fcfcfa', borderRadius: '5px', padding: '5px', backgroundColor: '#ff5f15' }} onClick={() => handleEdit(row)} />
          </Link>
          <DeleteOutlined style={{ fontSize: '20px', color: '#E7F3FF', borderRadius: '5px', padding: '5px', backgroundColor: '#3d9c06', marginLeft: '5px' }} onClick={() => handleDelete(row)} />
        </div>
      ),
    },
  ];


  return (
    <>
    <Link to="/Category"><button className="add-button mr-2">Add Category</button>
    </Link>
    <h3 class="mb-4 title">Coaching</h3>
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
                  className="searchInput"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchInputChange}
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

export default Shoplist;

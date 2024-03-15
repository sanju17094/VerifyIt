import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsSearch } from 'react-icons/bs';
import '../../src/Categorylist.css';

function SubCategorylist() {
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/subcategory/fetch?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
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
      const response = await fetch(`http://localhost:4000/api/v1/kheloindore/subcategory/update/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subcategory_name: 'Updated SubCategory Name'
        })
      });

      if (response.ok) {
        console.log('SubCategory name updated successfully');
      } else {
        const responseData = await response.json();
        console.error('Failed to update subcategory name:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating category name:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/subcategory/delete/${row._id}`;

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
        console.error('Failed to delete subcategory:', response.statusText);
        Swal.fire('Error', 'Failed to delete subcategory.', 'error');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      Swal.fire('Error', 'An error occurred while deleting the subcategory.', 'error');
    }
  };

  const handleSearch = () => {
    const filteredData = data.filter((row) =>
      row.category_name.toLowerCase().includes(searchText.toLowerCase())
      
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
      name: 'Category Type',
      selector: (row) => row.Subcategory_name,
    },
    {
      name: 'Status',
      selector: (row) => row.status ? 'Active' : 'InActive',
    },
    {
      name: 'Action',
      cell: (row) => (
        <Space size="middle">
          <Link to={`/UpdateCategory/${row._id}`}>
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
      <div>
        <h1>Sub Category List</h1>
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
              <Link to="/SubCategory"><button className="warning-button mr-2">Add SubCategory</button>
              </Link>

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
                {/* <button className="search-button" onClick={handleSearch}>
                  <BsSearch />
                </button> */}
              </Col>
            </Row>
          )}
          subHeaderAlign="right"
        />
      </div>
    </>
  );
}

export default SubCategorylist;

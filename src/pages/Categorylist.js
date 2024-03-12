import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Categorylist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace the URL with your actual API endpoint
      const response = await fetch('http://localhost:4000/api/v1/kheloindore/category/fetch');
      const result = await response.json();

      if (response.ok) {
        setData(result.categories); // Use result.categories instead of result.data
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
      const response = await fetch(`http://localhost:4000/api/v1/kheloindore/category/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_name: 'Updated Category Name',
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

  const columns = [
    {
      name: 'S.No.',
      selector: (_, index) => index + 1,
    },
    {
      name: 'Category Type',
      selector: (row) => row.category_name,
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
      <DataTable columns={columns} data={data} pagination progressPending={loading} />
    </>
  );
}

export default Categorylist;

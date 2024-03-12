import { Button, Space, Modal, Input, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import '../../src/Categorylist.css';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';




function Categorylist() {
  const [data, setData] = useState([
    {
      id: 1,
      S_No: "1",
      Category_Type: "Cricket",
      Status: "Active",
    },
    
    {
      id: 2,
      S_No: "2",
      Category_Type: "Hockey",
      Status: "Active",
    },
    {
      id: 3,
      S_No: "3",
      Category_Type: "Football",
      Status: "Active",
    }
  ]);

  const handleEdit = (row) => {
    console.log("Edit clicked for row: ", row);
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        );
        const newData = data.filter(item => item.id !== row.id);
        setData(newData);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "Your action has been cancelled :)",
          "error"
        );
      }
    });
  };

  const columns = [
    {
      name:"S.No.",
      selector: row => row.S_No
    },
    {
      name:"Category Type",
      selector: row => row.Category_Type
    },
    {
      name:"Status",
      selector: row => row.Status
    },
    {
      name: "Action",
      cell: row => (
        <Space size="middle">
          <Link to="/Category"><Button type="link" onClick={() => handleEdit(row)}>
            <EditOutlined />
          </Button></Link>
          <Button type="link" onClick={() => handleDelete(row)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <>     
        <DataTable
          columns={columns}
          data={data}
          pagination
        />
    </>
  );
}

export default Categorylist;

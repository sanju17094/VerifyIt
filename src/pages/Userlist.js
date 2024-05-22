import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { CSVLink } from 'react-csv';
// import { ColorRing } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import '../../src/Userlist.css';
// // import 'antd/dist/antd.css';
// import { Pagination } from 'antd';
// // import 'antd/lib/style/index.css';
import { API_URL } from '../ApiUrl';

function Userlist() {
  return (
    <>
      <h3 className="mb-4 title">Workflow Management</h3>
      <div className="cnt">
        <div className="d-flex flex-wrap">
          <Box title="Personal Details" />
          <Box title="Educational Details" />
          <Box title="Professional Details" />
          <Box title="Documents Details" />
        </div>
        <div className="mt-4">
          <Button variant="primary">Save Sequence</Button>
        </div>
      </div>
    </>
  );
}

function Box({ title }) {
  return (
    <div className="box">
      <h4>{title}</h4>
    </div>
  );
}

export default Userlist;
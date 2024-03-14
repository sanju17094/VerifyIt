import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsSearch } from 'react-icons/bs';

function Userlist() {
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
      const apiUrl = `http://localhost:4000/api/v1/kheloindore/venue/fetch?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;
      const response = await fetch(apiUrl);
      const result = await response.json();


      if (response.ok) {
        setData(result.data.venues); 
        console.log(result.data.venues, ">>>>>>>>>>>>");
      } else {
        console.error('Failed to fetch data:', result.error);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
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
      name: 'Venue Name',
      selector: (row) => row.name,
    },
    {
      name: 'Location',
      selector: (row) => row.location.address,
    },
    {
      name: 'Category',
      selector: (row) => row.last_name,
      
    },
    {
      name: 'Sub Category',
      selector: (row) => row.last_name,
      
    },
  ];


  return (
    <>
      <div>
        <h1>Venue List</h1>
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

export default Userlist;

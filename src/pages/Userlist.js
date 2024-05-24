import React from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import '../../src/Userlist.css';


import { useSelector,useDispatch } from 'react-redux';
function Userlist() {
   const themeColor = useSelector((state) => state.themeColor.changeColor);
  console.log("the theme Color",themeColor)
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
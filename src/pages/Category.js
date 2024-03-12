import '../../src/Category.css';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import React, { useState } from "react";


function Category() {
  // For Category Validation
  const [values, setValues] = useState({ 
    category: '' })

  function handleInput(event){
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.category.trim() === '') {
      Swal.fire({
        title: "Validation Error!",
        text: "Category cannot be empty",
        icon: "error"
      });
    } else {
      handleClick();
    }
  }

  const handleClick = () => {
    Swal.fire({
      title: "Submitted!",
      text: "You clicked the button!",
      icon: "success"
    });
   
  }

  return (
    <div className="form">
      <div className="mb-3">
        <Form.Label htmlFor="text">Add Categories*</Form.Label>
        <Form.Control
          type="text"
          id="text"
          name="category"
          aria-describedby="passwordHelpBlock"
          className="form-control-sm"
          value={values.category}
          onChange={handleInput}
        />
      </div>

      <Form.Group controlId="formCheckbox">
        <div className="checkbox-container">
          <Form.Check
            type="checkbox"
            aria-label="option 1"
            className="checkbox-input"
          />
        </div>
        <Form.Label className="checkbox-label">Status</Form.Label>
      </Form.Group>

      <div className="mb-3">
        <form>
          <Link to="/Categorylist"><button onClick={handleSubmit} className="btn1" type="submit"  onChange={handleInput}>Submit</button></Link>
          <button className="btn2" >Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Category;

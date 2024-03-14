import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
    const { _id } = useParams(); 
    
    const [values, setValues] = useState({ });

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/kheloindore/category/fetch-ind/`+_id)
            .then(res => {
                setValues({ category_name: res.data.category.category_name, status: res.data.category.status });
            })
            .catch(err => console.log(err))
    }, [_id]);

    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/v1/kheloindore/category/update/` + _id, values)
            .then(res => {
                console.log(res, "after backend");
                Swal.fire({
                    title: "Updated!",
                    text: "Category updated successfully!",
                    icon: "success"
                }).then(() => {
                    navigate('/Categorylist');
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update category",
                    icon: "error"
                });
            });
    }

    return (
        <div className="form">
            <div className="mb-3">
                <Form.Label htmlFor="text">Update Category</Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    name="category_name"
                    aria-describedby="passwordHelpBlock"
                    className="form-control-sm"
                    value={values.category_name || ''}
                    onChange={e => setValues({ ...values, category_name: e.target.value })}
                    placeholder=""
                />
            </div>

            <Form.Group controlId="formCheckbox">
                <div className="checkbox-container">
                    <Form.Check
                        type="checkbox"
                        id="statusCheckbox"
                        name="status"
                        aria-label="option 1"
                        className="checkbox-input"
                        checked={values.status || false}
                        onChange={e => setValues({ ...values, status: e.target.checked })}
                    />
                </div>
                <Form.Label className="checkbox-label">Status</Form.Label>
            </Form.Group>

            <div className="mb-3">
                <button className="btn1" type="submit" onClick={(e) => handleSubmit(e)}>
                    Update
                </button>
                <button className="btn2">Cancel</button>
            </div>
        </div>
    );
}

export default Update;

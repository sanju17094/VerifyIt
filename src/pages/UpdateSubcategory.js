import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
    const { _id } = useParams(); 
    
    const [values, setValues] = useState({ });

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/kheloindore/subcategory/fetch-ind/`+_id)
            .then(res => {
                setValues({ Subcategory_name: res.data.Subcategory.Subcategory_name, status: res.data.Subcategory.status });
            })
            .catch(err => console.log(err))
    }, [_id]);

    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/v1/kheloindore/subcategory/update/` + _id, values)
            .then(res => {
                console.log(res, "after backend");
                Swal.fire({
                    title: "Updated!",
                    text: "Subcategory updated successfully!",
                    icon: "success"
                }).then(() => {
                    navigate('/SubCategorylist');
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update subcategory",
                    icon: "error"
                });
            });
    }

    return (
        <div className="form">
            <div className="mb-3">
                <Form.Label htmlFor="text">Update Subcategory</Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    name="Subcategory_name"
                    aria-describedby="passwordHelpBlock"
                    className="form-control-sm"
                    value={values.Subcategory_name || ''}
                    onChange={e => setValues({ ...values, Subcategory_name: e.target.value })}
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
                        checked={values.status || true}
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

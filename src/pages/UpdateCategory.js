import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Category() {
    const { _id } = useParams(); 
    console.log(_id, "params in edit page");

    const [input, setInput] = useState({
        category_name: "",
        status: false,
        images: ""
    });

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const fetchCategoryDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/v1/kheloindore/category/fetch-ind/${_id}` 
            );
            const { category_name, status, images } = response.data;
            setInput({ category_name, status, images });
        } catch (error) {
            console.error("Error fetching category details:", error.message);
            
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: newValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:4000/api/v1/kheloindore/category/update/${_id}`, 
                input
            );
            console.log("Category Updated Successfully:", response);
            Swal.fire({
                title: "Updated!",
                text: "Category updated successfully!",
                icon: "success"
            });
        } catch (error) {
            console.error("Error updating category:", error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to update category",
                icon: "error"
            });
        }
    };

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
                    value={input.category_name}
                    onChange={handleInputChange}
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
                        checked={input.status}
                        onChange={handleInputChange}
                    />
                </div>
                <Form.Label className="checkbox-label">Status</Form.Label>
            </Form.Group>

            <div className="mb-3">
                <form>
                    <button className="btn1" type="submit" onClick={handleSubmit}>
                        Update
                    </button>
                    <button className="btn2">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Category;

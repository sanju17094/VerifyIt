import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { StateSelect, CitySelect } from "react-country-state-city";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { API_URL } from '../ApiUrl';
import '../Coaches.css'

const EnquiryDetails = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        comment: "",
        subject: "",
    });

    useEffect(() => {
        const fetchcoach = async () => {
            try {
                const response = await Axios.get(`${API_URL}/fetch-coach/${_id}`);
                const coach = response.data;
                console.log(response.data, "Data")
                setFormData({
                    first_name: coach.coach.first_name,
                    last_name: coach.coach.last_name,
                    email: coach.coach.email,
                    mobile: coach.coach.experience,
                    comment: coach.coach.availability,
                    subject: coach.coach.specializations.join(', ')
                });
            } catch (error) {
                console.error("Error fetching coach data:", error);
            }
        };

        fetchcoach();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log("Form Data Updated:", formData);
    };


    const handleCancel = () => {
        navigate('/enquiries');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.put(
                `${API_URL}/update-coach-super-admin/${_id}`,
                formData
            );
            console.log("API Response:", response.data);
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Your form data has been updated successfully.",
            }).then((result) => {
                navigate("/coaches");
            });
        } catch (error) {
            console.error("API Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update form. Please try again later.",
            });
        }
    };


    return (
        <>
            <h3 className="mb-4 title">Enquiry Details</h3>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="formMobileNumber">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="formSubject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="formComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <button type="submit" className="SubmitButton">
                        Submit
                    </button>

                    <button type="cancel" className="CancelButton" onClick={handleCancel}>
                        Cancel
                    </button>
                </Form>
            </Container>
        </>
    );
};

export default EnquiryDetails;
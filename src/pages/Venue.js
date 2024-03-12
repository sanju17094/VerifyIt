    import React, { useState } from 'react';
    // import 'bootstrap/dist/css/bootstrap.min.css';
    import axios from 'axios';
    import { Container, Row, Col, Form, Button } from 'react-bootstrap';
    import '../../src/Venue.css';

    const VenueBooking = () => {
    const [formData, setFormData] = useState({
        name: '',
    // ownerName: '',
        email: '',
        phone: '',
        location: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        // facilities: '',
        // categories: '',
        // bookingSlot: '',
        photos: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/kheloindore/venue/add', formData);
            console.log(response.data);
            alert('Venue added successfully');
        } catch (error) {
            alert('Failed to add venue');
            console.error('Error:', error);
        }
        console.log("hii")
    };

        return (
            <Container>
                <h3>Add Venue</h3>
                <hr></hr>
                <Row>
                    <Col md={4}>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="formOwnerName">
                                <Form.Label>Ownername</Form.Label>
                                <Form.Control type="text" placeholder="Enter Owner name" name="Ownername"   />
                            </Form.Group>

                            <Form.Group controlId="formLocation">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" name="city" value={formData.city} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" name="location" value={formData.location} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Label>Venue Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Venue Name" name="name" value={formData.name} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={4}>
                        {/* Second column content can go here */}

                        <Form.Group controlId="formName">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email " name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>


                        <Form.Group controlId="formAddress">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="Enter State" name="state" value={formData.state} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formLocation">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="text" placeholder="Enter Zipcode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="text" placeholder="" name="photos" value={formData.photos} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Slot</Form.Label>
                            <Form.Control type="number" placeholder="" name="bookingSlot" value={formData.bookingSlot}  />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        {/* Third column content can go here */}

                        <Form.Group controlId="formLocation">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Enter Country" name="country" value={formData.country} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Facilities</Form.Label>
                            <Form.Control type="text" placeholder="" name="facilities" value={formData.facilities}  />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Categories</Form.Label>
                            <Form.Control type="text" placeholder="" name="categories" value={formData.categories}  />
                        </Form.Group>


                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '50px' }}>
                        <Button variant="dark" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    };

    export default VenueBooking;

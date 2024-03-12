
import React, { useState } from 'react';
import axios from 'axios';
import '../../src/Signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    const url = 'http://localhost:4000/api/v1/kheloindore/user/signup';
    // const userData = {
    //   first_name: '',
    //   last_name: '',
    //   email: '',
    //   mobile: '',
    //   password: '',
    //   confirm_password: '',
    //   role: '',
    // };
console.log(url,formData,"hhhhhhhhh");
    try {
        const response = await axios.post(url, formData);
        console.log('Signup Successful:', response)
        alert('success');
        // You can handle success here, maybe redirect to another page or show a success message.
    } catch (error) {
        console.error('Error during signup:', error);
        alert('failed to signup ');
        // Handle error accordingly, display a message or prompt user to retry.
    }
};

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Mobile:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} />
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="">Select Role</option>
          <option value="User">Uesr</option>
          <option value="Venue Admin">Venue Admin</option>
          <option value="Coach">Coach</option>
          
        </select>
      </div>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default SignUp;




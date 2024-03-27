import { useState } from "react"; 
import '../../src/Loginadmin.css'
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import logoImage from '../../src/image.png';

function Loginadmin() {
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  console.log({ mobile, password })
  const handleEmail = (e) => {

    setmobile(e.target.value)
  }

  const handlePassword = (e) => {
    setpassword(e.target.value)
  }

  const handleApi = () => {
    if (!mobile.trim() || !password.trim()) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter mobile number and password',
        icon: 'error',
      });
    } else {
      axios
        .post('http://localhost:4000/api/v1/kheloindore/user/login', {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          console.warn('result', response.data);
          localStorage.setItem('token', response.data.token); // Store token in localStorage
          navigate('/dashboard');
        })
        .catch((error) => {
          console.log('Invalid mobile number or password');
          console.log(error);
        });
    }
  };
  
  

  return (
    <div>
    <div className="login_form">
    <img src={logoImage} alt="Logo" className="company_logo" style={{ width: '50px' }} />
    <h2>Admin Login</h2>
      Mobile Number <input value={mobile} onChange={handleEmail} type="text" /> <br />
      Password <input value={password} onChange={handlePassword} type="password" /> <br />
      <button onClick={handleApi} >Login</button>
    </div>
    </div>
  );
}

export default Loginadmin; 

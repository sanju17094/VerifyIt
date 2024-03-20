import { useState } from "react"; 
import '../../src/Loginuser.css'
import axios from "axios";
import Swal from 'sweetalert2'

function Loginadmin() {
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
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
          alert('Success');
        })
        .catch((error) => {
          console.log('Invalid mobile number or password');
          console.log(error);
        });
    }
  };
  
  

  return (
    <div className="login_form">
    <h1>Login</h1>
      Mobile Number <input value={mobile} onChange={handleEmail} type="text" /> <br />
      Password <input value={password} onChange={handlePassword} type="text" /> <br />
      <button onClick={handleApi} >Login</button>
    </div>
  );
}

export default Loginadmin; 

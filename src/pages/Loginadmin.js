import { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../src/image.png';
import '../../src/Loginadmin.css'
import { API_URL } from '../ApiUrl';



function Loginadmin() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setMobile(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
        .post(`${API_URL}/user/login`, {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          console.warn('result', response.data);
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        })
        .catch((error) => {
          console.log('Invalid mobile number or password');
          console.log(error);
        });
    }
  };
  
  return (
    <div className="con">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <img src={logoImage} alt="Logo" className="logo-image" style={{ maxWidth: '80px' }} />
              <form>
                <div className="form-group">
                  <label htmlFor="mobile" style={{ fontWeight: 'bold' }}>Mobile Number</label>
                  <input value={mobile} onChange={handleEmail} type="text" className="form-control" id="mobile" />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
                  <input value={password} onChange={handlePassword} type="password" className="form-control" id="password" />
                </div>
                <button onClick={handleApi} type="button" className="btn btn-dark">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginadmin;

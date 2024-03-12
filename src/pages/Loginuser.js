import { useState } from "react"; 
import '../../src/Loginuser.css'
import axios from "axios";





function Loginuser() {
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
    console.log({ mobile, password })
    axios.post('http://localhost:4000/api/v1/kheloindore/user/login', {
      mobile:mobile,
      password: password
    }).then((result) => {
      console.log(result.data)
      alert('success')
    })
      .catch(error => {
        alert('Invalid mobile password')
        console.log(error)
      })
  }

  
  return (
    <div className="login_form">
    <h2>Login</h2>
      mobile : <input value={mobile} onChange={handleEmail} type="text" /> <br />
      password : <input value={password} onChange={handlePassword} type="text" /> <br />
      <button onClick={handleApi} >Login</button>
    </div>
  );
}

export default Loginuser; 

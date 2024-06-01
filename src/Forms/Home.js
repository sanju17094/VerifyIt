import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GreetingPage.css";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VerificationStatus from "./VerificationStatus";
const HomePage = () => {
  const[statusPage,setStatusPage] = useState({
    submited :false,
    verification:false,
    adminMessage:""
  })
  
  const navigate = useNavigate();
const token = localStorage.getItem('token');

if(!token){
  navigate('/loginpage')
}
const decode = jwtDecode(token);
const id = decode.userID;
  // ruko
  let index;
  const sequenceArray = JSON.parse(localStorage.getItem("sequenceArrayData"));
  const storedMapArray = JSON.parse(localStorage.getItem("map1"));
  const map1 = new Map(storedMapArray);

  // console.log("map1 ka data", map1);
  if (Array.isArray(sequenceArray)) {
    index = sequenceArray.indexOf("Personal Details");
  } else {
    console.error("sequenceArrayData is not a valid array");
  }
  // console.log("index of Personal Details:", index);

  const handleNext = () => {
    const nextPage = sequenceArray[0];
    // console.log("nextPage ki value", nextPage);
    const link = map1.get(nextPage);
    // console.log("link next page ki", link);
    navigate(`/${link}`);
  };
let submited=false,verification=false;
useEffect(()=>{
  async function fetchData(){
    const response = await fetch(
      `http://localhost:8000/api/v1/Verifyit/fetch/submit-verification/${id}`
    );
    const result  = await response.json();
    console.log(
      "the result of home page checking status",
      result.data
    );
setStatusPage({
  submited:result.data.submitted,
  verification:result.data.verified,
  adminMessage:result.data.admin_message
})

  }
  fetchData();
},[])
   return (
     <>
       {statusPage.submited === true ? (
         <VerificationStatus
           submited={statusPage.submited}
           verification={statusPage.verification}
           adminMessage={statusPage.adminMessage}
         />
       ) : (
         <div className="greetingPage">
           <div className="homepage">
             <main>
               <section className="home">
                 <h2>Welcome to VerifyIt!</h2>
                 <div className="home-content">
                   <p>
                     Your go-to platform for verification and authentication
                     services. We ensure accuracy and reliability in all your
                     important documents and data.
                   </p>
                 </div>
                 <div className="buttons">
                   <button className="btn1" onClick={handleNext}>
                     Get Started
                   </button>
                   <Link to="/contact_us">
                     <button className="btn2">Contact Us</button>
                   </Link>
                 </div>
               </section>
             </main>
           </div>
         </div>
       )}
     </>
   );
};

export default HomePage;

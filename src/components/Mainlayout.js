import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import "./Mainlayout.css";
import {jwtDecode} from "jwt-decode"; 

function Mainlayout() {
  const navigate = useNavigate();
 
 
 const [sequenceArray, setSequenceArray] = useState([]);
 let id = null;


    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found", token);
        navigate("/loginpage");
        return;
      }

      try {
        const decode = jwtDecode(token);
        id = decode.userID;
        console.log("User ID", id);
      } catch (error) {
        console.log("Invalid token", error);
        navigate("/loginpage");
      }
    }, [navigate]);
    


  const map1 = new Map();
  map1.set("Personal Details", "personal_details");
  map1.set("Professional Details", "professional_details");
  map1.set("Educational Details", "educational_details");
  map1.set("Documents Details", "documents");

  useEffect(() => {
  
    async function sequenceFetch() {
   
 try {
        const userSequenceResponse = await fetch(
          `http://localhost:8000/api/v1/Verifyit/user-sequence/fetch/${id}`
        );
        const userSequenceJson = await userSequenceResponse.json();

        if (userSequenceJson.data && userSequenceJson.data.length > 0) {
          console.log("User sequence API result:", userSequenceJson.data);
          setSequenceArray(userSequenceJson.data);
        } else {
          const adminSequenceResponse = await fetch(
            "http://localhost:8000/api/v1/Verifyit/sequencing/fetch"
          );
          const adminSequenceJson = await adminSequenceResponse.json();
          console.log(
            "Admin sequence API result:",
            adminSequenceJson.sequence.sequence
          );
          setSequenceArray(adminSequenceJson.sequence.sequence);
        }
      } catch (error) {
        console.error("Error fetching sequence:", error);
      }
    }
      sequenceFetch();

  }, []);

  useEffect(() => {
    async function setData() {
      const payload = { sequence: sequenceArray };
      const response = await fetch(
        `http://localhost:8000/api/v1/Verifyit/user-sequence/set/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(
        "sequenceArray before saving:",
        JSON.stringify(sequenceArray)
      );

      localStorage.setItem("sequenceArrayData", JSON.stringify(sequenceArray));
      localStorage.setItem("map1", JSON.stringify(Array.from(map1.entries())));
    localStorage.setItem("documentUpload", JSON.stringify([]));
    }

    if (sequenceArray.length > 0) {
      setData();
    }
  }, [sequenceArray]);

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="sidebar">
          {sequenceArray.map((item, index) => (
            <h5 key={index}>
              <Link to="#">{item}</Link>
            </h5>
          ))}
          <h5>
            <Link to="preview_all">All Done!</Link>
          </h5>
        </div>
        <div className="right-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Mainlayout;

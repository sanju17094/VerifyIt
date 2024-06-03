import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import "./Mainlayout.css";
import {jwtDecode} from "jwt-decode"; // Correct import

function MainLayout() {
  const navigate = useNavigate();
  const [sequenceArray, setSequenceArray] = useState([]);
  const map1 = new Map();

  map1.set("Personal Details", "personal_details");
  map1.set("Professional Details", "professional_details");
  map1.set("Educational Details", "educational_details");
  map1.set("Documents Details", "documents");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || typeof token !== "string") {
      console.log("Token not found or invalid", token);
      navigate("/loginpage");
      return;
    }

    let id;
    try {
      const decode = jwtDecode(token);
      id = decode.userID;
      console.log("User ID->>>>", id);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/loginpage");
      return;
    }

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
  }, [navigate]);

  useEffect(() => {
    async function setData() {
      const token = localStorage.getItem("token");
      if (!token || typeof token !== "string") {
        navigate("/loginpage");
        return;
      }

      let id;
      try {
        const decode = jwtDecode(token);
        id = decode.userID;
      } catch (error) {
        navigate("/loginpage");
        return;
      }

      const payload = { sequence: sequenceArray };
      try {
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
      } catch (error) {
        console.error("Error setting sequence data:", error);
      }
    }

    if (sequenceArray.length > 0) {
      setData();
    }
  }, [sequenceArray, navigate]);

  return (
    <>
      <Header />
      <div className="main-auth">
        <div className="sidebar">
          {sequenceArray.map((item, index) => (
            <h5 key={index}>
              <Link to="#">{item}</Link>
            </h5>
          ))}
          <h5>
            <Link to="#">All Done!</Link>
          </h5>
        </div>
        <div className="right-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;

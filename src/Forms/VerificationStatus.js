import React from "react";
import "./VerificationStatus.css";
import { useNavigate } from "react-router-dom";

function VerificationStatus(props) {
  const { submited, verification, adminMessage } = props;
  const navigate = useNavigate();
  const sequenceArrayData = JSON.parse(
    localStorage.getItem("sequenceArrayData")
  );
  const map1 = new Map(JSON.parse(localStorage.getItem("map1")));

  console.log("map 1 ki value verification status pr", map1);

  return (
    <div className="verification-container">
      <h1>The Document Submitted Successfully</h1>
      <h2>
        Submission Status:{" "}
        <span className={verification ? "verified" : "not-verified"}>
          {verification ? "Verified" : "Not Verified"}
        </span>
      </h2>
      {adminMessage && (
        <div className="admin-message">
          <h3>Admin Message:</h3>
          <p>{adminMessage}</p>
          <button
            onClick={() => {
              navigate(`/${map1.get(sequenceArrayData[0])}`);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default VerificationStatus;

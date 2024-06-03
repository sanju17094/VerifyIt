import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./FormStyle.css";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UploadDocuments = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const user_id = decode.userID;
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    highSchoolDocument: null,
    intermediateDocument: null,
    graduateDocument: null,
    postGraduateDocument: null,
    aadharCard: null,
    panCard: null,
    licence: null,
    voterIdCard: null,
    offerLetter1: null,
    offerLetter2: null,
    offerLetter3: null,
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    highSchoolDocument: null,
    intermediateDocument: null,
    graduateDocument: null,
    postGraduateDocument: null,
    aadharCard: null,
    panCard: null,
    licence: null,
    voterIdCard: null,
    offerLetter1: null,
    offerLetter2: null,
    offerLetter3: null,
    profilePhoto: null,
  });

  const [finalResp, setFinalResp] = useState({
    user_id: user_id,
    x_marksheet: null,
    xii_marksheet: null,
    graduationMarksheet: null,
    postGraduationMarksheet: null,
    adharCard: null,
    pan: null,
    licence: null,
    voterId: null,
    offerLetter: null,
    profilePhoto: null,
  });
  const keyMapping = new Map([
    ["highSchoolDocument", "x_marksheet"],
    ["intermediateDocument", "xii_marksheet"],
    ["graduateDocument", "graduationMarksheet"],
    ["postGraduateDocument", "postGraduationMarksheet"],
    ["aadharCard", "adharCard"],
    ["panCard", "pan"],
    ["licence", "licence"],
    ["voterIdCard", "voterId"],
    ["offerLetter1", "offerLetter1"],
    ["offerLetter2", "offerLetter2"],
    ["offerLetter3", "offerLetter3"],
    ["profilePhoto", "profilePhoto"],
  ]);
  console.log("keymapping",keyMapping)
  const [documentUpload,setDocUpload] =useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (files[0]) {
      setPreviews({
        ...previews,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setPreviews({
        ...previews,
        [name]: null,
      });
    }
  };

  const handleRemove = (name, type, file) => {
    setFormData({
      ...formData,
      [name]: null,
    });

    setPreviews({
      ...previews,
      [name]: null,
    });

    setErrors({
      ...errors,
      [name]: "This field is required.",
    });
  };

  const handleNext = () => {
    navigate("/preview_all");
  };
useEffect(()=>{
  async function fetchDoc (){
    const response = await fetch(
      `http://localhost:8000/api/v1/Verifyit/required/doc/fetch/${user_id}`
    );
    const result = await response.json();
    console.log("required document ->>>",result.data)
    setDocUpload(result.data); 
    const fetchPre = await fetch(
      `http://localhost:8000/api/v1/Verifyit//documentation/get-id/${user_id}`
    );
    const result2 = await fetchPre.json();
    console.log("previews ->>>", result2.docDetails);
    const dataResult = result2.docDetails;
    if(dataResult){

    

    setFormData({
      highSchoolDocument: dataResult.x_marksheet || "",
      intermediateDocument: dataResult.xii_marksheet || "",
      graduateDocument: dataResult.graduationMarksheet || "",
      postGraduateDocument: dataResult.postGraduateDocument || "",
      aadharCard: dataResult.adharCard || "",
      panCard: dataResult.pan || "",
      licence: dataResult.licence || "",
      voterIdCard: dataResult.voterId || "",
      offerLetter1: dataResult.offerLetter[0] || "",
      offerLetter2: dataResult.offerLetter[1] || "",
      offerLetter3: dataResult.offerLetter[2] || "",
      profilePhoto: dataResult.profilePhoto || "",
    });
  setPreviews({
    highSchoolDocument: dataResult.x_marksheet || "",
    intermediateDocument: dataResult.xii_marksheet || "",
    graduateDocument: dataResult.graduationMarksheet || "",
    postGraduateDocument: dataResult.postGraduateDocument || "",
    aadharCard: dataResult.adharCard || "",
    panCard: dataResult.pan || "",
    licence: dataResult.licence || "",
    voterIdCard: dataResult.voterId.src || "",
    offerLetter1: dataResult.offerLetter[0] || "",
    offerLetter2: dataResult.offerLetter[1] || "",
    offerLetter3: dataResult.offerLetter[2] || "",
    profilePhoto: dataResult.profilePhoto || "",
  }); 
}
}
  fetchDoc();
},[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required.";
      }
    });

    setErrors(newErrors);

    // if (Object.keys(newErrors).length > 0) {
    //   return;
    // }

    console.log("form data", formData);
    const entries = Object.entries(formData);

    const arrOfferLetter = [];
    const updatedFinalResp = { ...finalResp };

    await Promise.all(
      entries.map(async ([key, file]) => {
        if (file) {
          const formData = new FormData();
          formData.append("uploadFile", file);

          try {
            const response = await fetch(
              "http://localhost:8000/api/v1/Verifyit/upload-file",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!response.ok) {
              throw new Error(`Failed to upload ${key}`);
            }

            const data = await response.json();
            console.log(`Uploaded ${key}:`, data.file_data[0]);

            if (
              key === "offerLetter1" ||
              key === "offerLetter2" ||
              key === "offerLetter3"
            ) {
              arrOfferLetter.push(data.file_data[0]);
            } else {
              updatedFinalResp[keyMapping.get(key)] = data.file_data[0];
              console.log("BAWa key_>>", keyMapping.get(key));
            }
          } catch (error) {
            console.error(`Error uploading ${key}:`, error);
          }
        }
      })
    );

    updatedFinalResp.offerLetter = arrOfferLetter;
    setFinalResp(updatedFinalResp);
   setDone(true);
  };

  useEffect(() => {
    if (done) {
      console.log("_>>>>>>>")
      async function uploadData() {
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/Verifyit/documentation/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(finalResp),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to create documentation: ${response.statusText}`
            );
          }

          const data = await response.json();
          console.log("response Data of Last Upload", data);
          navigate('/preview_all')
        } catch (error) {
          console.error("Error uploading final data:", error);
        }
      }
      uploadData();
    }
  }, [done, finalResp]);

  const renderPreview = (file, type, name) => {
    if (!file) return null;
    return (
      <div style={{ marginTop: "10px" }}>
        {type?.startsWith("image/") ? (
          <img
            src={file}
            alt="Preview"
            style={{ width: "40%", height: "auto" }}
          />
        ) : (
          <a href={file} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        )}
        <button
          type="button"
          onClick={() => handleRemove(name, type, file)}
          style={{ marginLeft: "10px", border: "none", background: "none" }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    );
  };

  return (
    <>
      <h3 className="mb-4 title">Upload Documents</h3>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            {documentUpload.includes("high") && (
              <Col md={4}>
                <Form.Group controlId="formHighSchoolDocument">
                  <Form.Label>
                    High School Document<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="highSchoolDocument"
                    onChange={handleChange}
                    isInvalid={!!errors.highSchoolDocument}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.highSchoolDocument}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.highSchoolDocument,
                    formData.highSchoolDocument?.type,
                    "highSchoolDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("inter") && (
              <Col md={4}>
                <Form.Group controlId="formIntermediateDocument">
                  <Form.Label>
                    12th Grade Document<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="intermediateDocument"
                    onChange={handleChange}
                    isInvalid={!!errors.intermediateDocument}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.intermediateDocument}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.intermediateDocument,
                    formData.intermediateDocument?.type,
                    "intermediateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("graduate") && (
              <Col md={4}>
                <Form.Group controlId="formGraduateDocument">
                  <Form.Label>
                    Graduate Document<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="graduateDocument"
                    onChange={handleChange}
                    isInvalid={!!errors.graduateDocument}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.graduateDocument}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.graduateDocument,
                    formData.graduateDocument?.type,
                    "graduateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("post") && (
              <Col md={4}>
                <Form.Group controlId="formPostGraduateDocument">
                  <Form.Label>
                    Post Graduate Document<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="postGraduateDocument"
                    onChange={handleChange}
                    isInvalid={!!errors.postGraduateDocument}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postGraduateDocument}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.postGraduateDocument,
                    formData.postGraduateDocument?.type,
                    "postGraduateDocument"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("aadhar_card") && (
              <Col md={4}>
                <Form.Group controlId="formAadharCard">
                  <Form.Label>
                    Aadhar Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="aadharCard"
                    onChange={handleChange}
                    isInvalid={!!errors.aadharCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.aadharCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.aadharCard,
                    formData.aadharCard?.type,
                    "aadharCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("pan_card") && (
              <Col md={4}>
                <Form.Group controlId="formPanCard">
                  <Form.Label>
                    PAN Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="panCard"
                    onChange={handleChange}
                    isInvalid={!!errors.panCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.panCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.panCard,
                    formData.panCard?.type,
                    "panCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("licence") && (
              <Col md={4}>
                <Form.Group controlId="formLicence">
                  <Form.Label>
                    Licence<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                  
                    type="file"
                    name="licence"
                    onChange={handleChange}
                    isInvalid={!!errors.licence}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.licence}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.licence,
                    formData.licence?.type,
                    "licence"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("voter_id") && (
              <Col md={4}>
                <Form.Group controlId="formVoterIdCard">
                  <Form.Label>
                    Voter ID Card<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                  defaultValue={formData.voterIdCard}
                    type="file"
                    name="voterIdCard"
                    onChange={handleChange}
                    isInvalid={!!errors.voterIdCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.voterIdCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.voterIdCard,
                    formData.voterIdCard?.type,
                    "voterIdCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("passport") && (
              <Col md={4}>
                <Form.Group controlId="formPassport">
                  <Form.Label>
                    Passport<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="voterIdCard"
                    onChange={handleChange}
                    isInvalid={!!errors.voterIdCard}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.voterIdCard}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.voterIdCard,
                    formData.voterIdCard?.type,
                    "voterIdCard"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job1") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter1">
                  <Form.Label>
                    Offer Letter 1<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter1"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter1}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter1}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter1,
                    formData.offerLetter1?.type,
                    "offerLetter1"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job2") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter2">
                  <Form.Label>
                    Offer Letter 2<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter2"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter2}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter2}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter2,
                    formData.offerLetter2?.type,
                    "offerLetter2"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("job3") && (
              <Col md={4}>
                <Form.Group controlId="formOfferLetter3">
                  <Form.Label>
                    Offer Letter 3<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="offerLetter3"
                    onChange={handleChange}
                    isInvalid={!!errors.offerLetter3}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerLetter3}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.offerLetter3,
                    formData.offerLetter3?.type,
                    "offerLetter3"
                  )}
                </Form.Group>
              </Col>
            )}
            {documentUpload.includes("profile") && (
              <Col md={4}>
                <Form.Group controlId="formProfilePhoto">
                  <Form.Label>
                    Profile Photo<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePhoto"
                    onChange={handleChange}
                    isInvalid={!!errors.profilePhoto}
                    style={{ marginTop: "5px", marginBottom: "15px" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.profilePhoto}
                  </Form.Control.Feedback>
                  {renderPreview(
                    previews.profilePhoto,
                    formData.profilePhoto?.type,
                    "profilePhoto"
                  )}
                </Form.Group>
              </Col>
            )}
          </Row>

          <Row style={{ marginTop: "20px", marginLeft: "0px" }}>
            <Col md={12}>
              <div className="ButtonsContainer d-flex justify-content-start">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>

                <button type="submit" className="submit-button">
                  Save and Preview
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UploadDocuments;

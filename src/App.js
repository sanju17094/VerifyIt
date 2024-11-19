import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import PersonalDetails from './Forms/PersonalDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails';
import DocumentsDetails from './Forms/Documents';

import PreviewAll from './Forms/PreviewAll';
import SignupForm from '../src/Login/Signup/signup';
import OTPPage from '../src/Login/Signup/OTPPage';
import LoginPage from '../src/Login/Signup/Login';
import HomePage from '../src/Forms/Home'
import ContactUsForm from './Forms/ContactUs';
import VerificationStatus from './Forms/VerificationStatus';
import Demo from './Forms/demo'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/otppage" element={<OTPPage />} />
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<HomePage />} />
          <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="contact_us" element={<ContactUsForm />} />

          <Route
            path="professional_details"
            element={<ProfessionalDetails />}
          />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="documents" element={<DocumentsDetails />} />
          <Route path="preview_all" element={<PreviewAll />} />
          <Route path="/verification-status" element={<VerificationStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


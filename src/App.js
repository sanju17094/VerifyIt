


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import PersonalDetails from './Forms/PersonalDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails';
import DocumentsDetails from './Forms/Documents';

import PreviewAll from './Forms/PreviewAll';
import SignupForm from '../src/Login/Signup/signup';
import OTPPage from '../src/Login/Signup/OTPPage';
import LoginPage from '../src/Login/Signup/Login';
import Home from '../src/Forms/Home'





function App() {
  return (
    <Router>
      <Routes>
      <Route path="/loginpage" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/otppage" element={<OTPPage />} />
      <Route path="/" element={<Mainlayout />}>
          <Route path="home" element={<Home />} />
          <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="professional_details" element={<ProfessionalDetails />} />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="documents" element={<DocumentsDetails />} />
          <Route path="preview_all" element={<PreviewAll />} />
      </Route>

      </Routes>
    </Router>
  );
}

export default App;


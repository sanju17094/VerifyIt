import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import PersonalDetails from './Forms/PersonalDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails';
import PreviewAll from './Forms/PreviewAll';
import SignupForm from './Forms/signup';
import OTPPage from './Forms/OTPPage';
import LoginPage from './Forms/login';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignupForm/>}/>
      <Route path="/otppage" element={<OTPPage />} />
      <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/mainlayout" element={<Mainlayout />}>
          <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="professional_details" element={<ProfessionalDetails />} />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="preview_all" element={<PreviewAll />} />
      </Route>

      </Routes>
    </Router>
  );
}

export default App;

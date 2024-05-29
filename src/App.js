


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import PersonalDetails from './Forms/PersonalDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails';
import PreviewAll from './Forms/PreviewAll';
<<<<<<< HEAD
import SignupForm from '../src/Login/Signup/signup';
import OTPPage from '../src/Login/Signup/OTPPage';
import LoginPage from '../src/Login/Signup/loginpage';


=======
import SignupForm from './Forms/signup';
import OTPPage from './Forms/OTPPage';
import LoginPage from './Forms/login';
>>>>>>> ba896ee42e2991711b7604607ff42c0958fb179c


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignupForm/>}/>
      <Route path="/otppage" element={<OTPPage />} />
      <Route path="/loginpage" element={<LoginPage/>}/>
<<<<<<< HEAD
      <Route path="/mainlayout" element={<Mainlayout />}>
          <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="professional_details" element={<ProfessionalDetails />} />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="preview_all" element={<PreviewAll />} />
=======
        <Route path="/mainlayout" element={<Mainlayout />}>
          {/* <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="professional_details" element={<ProfessionalDetails />} />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="preview_all" element={<PreviewAll />} /> */}
>>>>>>> ba896ee42e2991711b7604607ff42c0958fb179c
      </Route>

      </Routes>
    </Router>
  );
}

export default App;


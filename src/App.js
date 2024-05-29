import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import PersonalDetails from './Forms/PersonalDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails';
import PreviewAll from './Forms/PreviewAll';
import Documents from './Forms/Documents';
import Home from './components/Home'
// import Login from './Login/Signup/Login';


function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Mainlayout />}>
          <Route path="personal_details" element={<PersonalDetails />} />
          <Route path="professional_details" element={<ProfessionalDetails />} />
          <Route path="documents" element={<Documents />} />
          <Route path="educational_details" element={<EducationalDetails />} />
          <Route path="preview_all" element={<PreviewAll />} />
          <Route path="home" element={<Home />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

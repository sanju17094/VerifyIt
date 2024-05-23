import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Mainlayout from '../src/components/Mainlayout';
import BasicDetailsForm from './Forms/BasicDetails';
import ProfessionalDetails from './Forms/ProfessionalDetails';
import EducationalDetails from './Forms/EducationalDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainlayout />} />
        <Route path="/basic-details" element={<BasicDetailsForm />} />
        <Route path="/professional_details" element={<ProfessionalDetails />} />
        <Route path="/educational_details" element={<EducationalDetails />} />
        

      </Routes>
    </Router>
  );
}

export default App;

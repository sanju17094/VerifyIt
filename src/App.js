import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import ThemeList from "./pages/Theme";
import Loginadmin from "./pages/Loginadmin";
import Workflow from "./pages/Workflow";
import CheckValidate from "./CheckValidate";
import EnquiryList from "./pages/EnquiryList";
import EnquiryDetails from "./pages/EnquiryDetail"
import UserList from "./pages/Userlist";
import FieldManagement from "./components/FieldManagement";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/fieldmanagement/:_id" element={<FieldManagement/>}/>
         <Route path="/" element={<Loginadmin />} />
        <Route path="*" element={<Loginadmin />} />
        <Route path="/" element={<CheckValidate />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/userlist" element={<UserList/>} />
            <Route path="/enquiries" element={<EnquiryList />} />
            <Route path="/enquiry/details/:_id" element={<EnquiryDetails />} />
            <Route path="/theme" element={<ThemeList />} />
          </Route>
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import SuperAdmin from './components/SuperAdmin';


import Categorylist from "./pages/Categorylist";


// import UserProfile from "./pages/UserProfile";

import Loginadmin from "./pages/Loginadmin";
// import Signup from "./pages/Signup";

import Userlist from "./pages/Userlist";
// import Venuetable from "./pages/Venuetable";
// import Adminlist from "./pages/Adminlist";
// import UpdateUser from "./pages/UpdateUser";
// import Login from "./pages/Login";
// import UserLogin from "./pages/UserLogin";
// import Protected from "./components/Protected";
// import ChoachingList from "./pages/ChoachingList";
import CheckValidate from "./CheckValidate";
import EnquiryList from "./pages/EnquiryList";
import EnquiryDetails from "./pages/EnquiryDetail"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginadmin />} />
        <Route path="*" element={<Loginadmin />} />
        <Route path="/" element={<CheckValidate />}>
          <Route path="/" element={<MainLayout />}>
            {/* <Route path="/" element={<UserLogin />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* <Route path="/userprofile" element={ }>
          </Route> */}
            <Route path="/users" element={<Userlist />} />
            {/* <Route path="/adminlist" element={<Adminlist/>} /> */}
            {/* <Route path="/coaches" element={<ChoachingList />} /> */}
            <Route path="/enquiries" element={<EnquiryList />} />
            <Route path="/enquiry/details/:_id" element={<EnquiryDetails />} />

            

       

       
        
            {/* <Route path="/venues" element={<Venuetable />} /> */}
            <Route path="/categories" element={< Categorylist/>} />
           
          
          

           
        
           
           
          
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import UserProfile from "./pages/UserProfile";
import Category from "./pages/Category";
import Venue from "./pages/Venue";
import Loginadmin from "./pages/Loginadmin";
import Signup from "./pages/Signup";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateSubcategory from "./pages/UpdateSubcategory";
import SubCategory from "./pages/SubCategory";
import SubCategoryList from "./pages/SubCategoryList";
import Userlist from "./pages/Userlist";
import Venuetable from "./pages/Venuetable";
import Adminlist from "./pages/Adminlist";
import Adduser from "./pages/Adduser";
import UpdateAdmin from "./pages/UpdateAdmin";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import Protected from "./components/Protected";
import ChoachingList from "./pages/ChoachingList";
import PersonalTrainingList from "./pages/PersonalTrainingList";
import EventList from "./pages/EventList";
import Shoplist from "./pages/Shoplist";
import User from "./pages/User";


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/" element={<MainLayout />} >
        {/* <Route path="/" element={<UserLogin />} /> */}
          <Route path="/dashboard" element={<Dashboard/>} />
         
          
          {/* <Route path="/userprofile" element={ }>
          </Route> */}
          <Route path="/userlist" element={<Userlist/>} />
          <Route path="/adminlist" element={<Adminlist/>} />
          <Route path="/adduser" element={<Adduser/>} />
          <Route path="/coaching" element={<ChoachingList/>} />
          <Route path="/personaltraining" element={<PersonalTrainingList/>} />
          <Route path="/events" element={<EventList/>} />
          <Route path="/shop" element={<Shoplist/>} />
          <Route path="/user" element={<User/>} />


         
          
          

          <Route path="/category" element={<Category />} />
          <Route path="/Subcategory" element={<SubCategory />} />
          <Route path="/subcategorylist" element={<SubCategoryList /> } />
          <Route path="/venue" element={<Venue />} />
          <Route path="/venuelist" element={<Venuetable />} />
          <Route path="/categorylist" element={<Categorylist />} />
          <Route path="/UpdateCategory/:_id" element={<UpdateCategory />} />
          <Route path="/UpdateSubcategory/:_id" element={<UpdateSubcategory />} />
          <Route path="/UpdateAdmin/:_id" element={<UpdateAdmin />} />
          {/* <Route path="/userprofile" element={<Loginuser />} />
          </Routes> */}

          <Route path="/" element={<Enquiries />} />
          <Route path="/" element={<Bloglist />} />
          <Route path="/" element={<Blogcatlist />} />
          <Route path="/" element={<Orders />} />
          <Route path="/" element={<Customers />} />
          <Route path="/" element={<Colorlist />} />
          
          <Route path="/" element={<Brandlist />} />
          <Route path="/" element={<Productlist />} />
          <Route path="/" element={<Couponlist />} />
          <Route path="/" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="/" element={<Addproduct />} />
          <Route path="/" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

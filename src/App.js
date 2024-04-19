import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
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
import UpdateCategory from './pages/UpdateCategory';
import UpdateSubcategory from "./pages/UpdateSubcategory";
import SubCategory from "./pages/SubCategory";
import SubCategoryList from "./pages/SubCategoryList";
import Userlist from "./pages/Userlist";
import Venuetable from "./pages/Venuetable";
import Adminlist from "./pages/Adminlist";
import UpdateUser from "./pages/UpdateUser";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import Protected from "./components/Protected";
import ChoachingList from "./pages/ChoachingList";
import EventList from "./pages/EventList";
import Shoplist from "./pages/Shoplist";
import User from "./pages/User";
import UpdateVenue from "./pages/UpdateVenue";
import CoachForm from "./pages/Coaches";
import UpdateCoach from "./pages/UpdateCoach"
import CheckValidate from "./CheckValidate";
import UpdateEvent from "./pages/UpdateEvent";
import UpdatePT from "./pages/UpdatePT";
import AddPT from "./pages/AddPT"
import PersonalTrainingList from "./pages/PersonalTrainingList";
import AddEvent from "./pages/addEvent";
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
            <Route path="/coaches" element={<ChoachingList />} />
            <Route path="/enquiries" element={<EnquiryList />} />
            <Route path="/enquiry/details/:_id" element={<EnquiryDetails />} />

            

            <Route
              path="/personal-traning/add"
              element={<AddPT />} />

            <Route path="/personal-training/edit/:_id" element={<UpdatePT />} />

            <Route path="/event/edit/:_id" element={<UpdateEvent />} />


            <Route
              path="/personal-training"
              element={<PersonalTrainingList />}
            />

            <Route path="/events" element={<EventList />} />
            <Route path="/event/add" element={<AddEvent />} />
            <Route path="/shop/add" element={<Shoplist />} />
            <Route path="/shop" element={<Shoplist />} />
            <Route path="/users/add" element={<User />} />
            <Route path="/categories/add" element={<Category />} />
            <Route path="/Subcategory" element={<SubCategory />} />
            <Route path="/subcategorylist" element={<SubCategoryList />} />
            <Route path="/venues/add" element={<Venue />} />
            <Route path="/venues" element={<Venuetable />} />
            <Route path="/categories" element={<Categorylist />} />
            <Route path="/categories/edit/:_id" element={<UpdateCategory />} />
            <Route path="/venues/edit/:_id" element={<UpdateVenue />} />
            <Route
              path="/UpdateSubcategory/:_id"
              element={<UpdateSubcategory />}
            />
            <Route path="/UpdateUser/:_id" element={<UpdateUser />} />
            <Route path="/coaches/edit/:_id" element={<UpdateCoach />} />
            <Route path="/coaches/add" element={<CoachForm />} />


            <Route path="/event/edit/:_id" element={<UpdateEvent />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

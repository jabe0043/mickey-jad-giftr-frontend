import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import People from "./pages/people/People";
import AddEditPerson from "./pages/people/AddEditPerson";
import Header from "./pages/Header";
import Gifts from "./pages/gifts/Gifts";
import AddEditGift from "./pages/gifts/AddEditGift";
import AnimatedRoutes from "./AnimatedRoutes";

export default function App() {
  return (
    <div className="App container">
      <Header />

      <AnimatedRoutes />
      {/* <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/people" element={<People />} />
        <Route path="/people/edit/:personId" element={<AddEditPerson />} />
        <Route path="/people/add" element={<AddEditPerson />} />
        <Route path="/gift/:personId" element={<Gifts />} />
        <Route path="/gift/:personId/edit/:giftId" element={<AddEditGift />} />
        <Route path="/gift/:personId/add" element={<AddEditGift />} />
      </Routes> */}
    </div>
  );
}




/****** AUTHORIZATION NOT REQUIRED *********
  /                   --> login route   


  // ***** AUTHORIZATION REQUIRED *****
  /people             --> list of people from the DB
  
  /people/add         --> add a new person form OR
  /people/:pid        --> edit a person   OR
  /people/form/:pid   --> edit a person
  /people/form        --> add a person
  
  /people/:pid/gifts  --> person id is part of the url 
  
  /gifts/form         --> both person and gift id are context variables
  /gifts/form/:gid
  /people/:pid/gifts/:gid
  
  */

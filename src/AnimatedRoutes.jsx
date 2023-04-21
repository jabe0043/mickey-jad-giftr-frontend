import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import {AnimatePresence} from "framer-motion";

import Login from './pages/login/Login'
import People from "./pages/people/People";
import AddEditPerson from "./pages/people/AddEditPerson";
import Gifts from "./pages/gifts/Gifts";
import AddEditGift from "./pages/gifts/AddEditGift";
import FourOFour from './pages/FourOFour/FourOFour';


export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode={"wait"} >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login/>} />
        <Route path="/people" element={<People />} key={location} />
        <Route path="/people/edit/:personId" element={<AddEditPerson />} key={location} />
        <Route path="/people/add" element={<AddEditPerson />} />
        <Route path="/gift/:personId" element={<Gifts />} />
        <Route path="/gift/:personId/edit/:giftId" element={<AddEditGift />} />
        <Route path="/gift/:personId/add" element={<AddEditGift />} />
        <Route path="/*" element={<FourOFour />} />
      </Routes>
    </AnimatePresence>
  )
}

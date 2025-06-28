import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer"
import Navbar from "./components/NavBar";
import RegisterPage from "./components/RegisterPage";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Router>
      <Navbar/>
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path ="/login"  element={<Login/>}/>

        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;

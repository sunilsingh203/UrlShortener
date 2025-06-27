import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer"
import Navbar from "./components/NavBar";

const App = () => {
  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;

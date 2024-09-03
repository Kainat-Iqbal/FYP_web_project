import React from "react";
// Sections
import TopNavbar from "../Components/LandingPage/MainScreen/Nav/TopNavbar";
import Header from "../Components/LandingPage/MainScreen/Sections/Header";
import Services from "../Components/LandingPage/MainScreen/Sections/Services";
import Projects from "../Components/LandingPage/MainScreen/Sections/Projects";
// import Blog from "../Components/LandingPage/MainScreen/Sections/Blog";
import Pricing from "../Components/LandingPage/MainScreen/Sections/Pricing";
import Contact from "../Components/LandingPage/MainScreen/Sections/Contact";
import Footer from "../Components/LandingPage/MainScreen/Sections/Footer";

// import LoginPage from "../Components/LandingPage/LoginPage";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Header from "../components/Sections/Header";
// import Services from "../components/Sections/Services";
// import Projects from "../components/Sections/Projects";
// import Blog from "../components/Sections/Blog";
// import Pricing from "../components/Sections/Pricing";
// import Contact from "../components/Sections/Contact";
// import Footer from "../components/Sections/Footer"

function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />


    </>
  );
}

export default Landing;



import React from "react";
// Sections
import TopNavbar from "../Components/LandingPage/MainScreen/Nav/TopNavbar";
import Header from "../Components/LandingPage/MainScreen/Sections/Header";
import Services from "../Components/LandingPage/MainScreen/Sections/Services";
import Projects from "../Components/LandingPage/MainScreen/Sections/Projects";
import Blog from "../Components/LandingPage/MainScreen/Sections/Blog";
import Pricing from "../Components/LandingPage/MainScreen/Sections/Pricing";
import Contact from "../Components/LandingPage/MainScreen/Sections/Contact";
import Footer from "../Components/LandingPage/MainScreen/Sections/Footer";

function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services/>
      <Projects/>
      <Pricing />
      <Contact />
      <Footer />


    </>
  );
}

export default Landing;



import React from "react";
import Hero from "./Hero";
import About from "./About";
import Program from "./Program";
import ProgramImpact from "./ProgramImpact";
import Testimonial from "./Testimonial";
import Youtube from "./Youtube";
import Contact from "./Contact";
const LandingPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Program />
      <ProgramImpact />
      {/* <Testimonial /> */}
      <Youtube />
      <Contact />
    </>
  );
};

export default LandingPage;

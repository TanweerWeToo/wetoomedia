import React from "react";
import Hero from "./Hero";
import About from "./About";
import Program from "./Program";
import ProgramImpact from "./ProgramImpact";
import Testimonial from "./Testimonial";
import Youtube from "./Youtube";
import Contact from "./Contact";
import YoutubeVideos from "./YoutubeVideos";
import YoutubeTestimonials from "./YoutubeTestimonials";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <About />
      <YoutubeTestimonials />
      <Youtube />
      <YoutubeVideos />
      <Program />
      <ProgramImpact />
      {/* <Testimonial /> */}
      <Contact />
    </>
  );
};

export default LandingPage;

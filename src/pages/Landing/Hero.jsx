import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  GraduationCap,
  Handshake,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import hero from "../../assets/TanveerSir.webp";

// Compact CountUp component
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const startVal = 0;
    const endVal = end;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(
        progress * (endVal - startVal) + startVal
      );

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const videoSectionRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonial highlights
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);

    // Detect when stats section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      clearInterval(interval);
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Animated stats
  const stats = [
    {
      number: "5",
      label: "Years Guiding Dreams",
      delay: "0",
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "250",
      label: "Students Empowering Futures",
      delay: "150",
      icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "100",
      label: "Partners Building Trust",
      delay: "300",
      icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <section
      id="hero"
      className="bg-primary text-white px-5 md:px-8 pb-10 pt-[112px] md:pb-20 md:pt-[136px] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content - Responsive layout with entrance animations */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16 mb-10 md:mb-14">
          {/* Left Column */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 md:mb-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></div>
              <p className="text-white/90 text-xs font-medium group-hover:text-white transition-colors">
                Taiyari Karo, Sarkari Bano!
              </p>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              WeToo Media{" "}
              <span className="text-secondary relative inline-block">
                Empower Futures!
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary/30 rounded-full transition-all duration-1000"
                  style={{ width: isVisible ? "100%" : "0%" }}
                ></span>
                <span className="absolute top-0 -right-5 w-5 h-5 text-secondary">
                  <Star className="w-full h-full fill-secondary hidden md:block animate-spin-slow" />
                </span>
              </span>
              {/* <br className="hidden md:block" />
              <span className="relative">
                {" "}
                Digital Agency
                <span
                  className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white/30 rounded-full transition-all duration-1000"
                  style={{
                    width: isVisible ? "52%" : "0%",
                    transitionDelay: "0.5s",
                  }}
                ></span>
              </span> */}
            </h1>

            {/* Sleeker buttons with reduced height and width */}
            <div className="flex flex-wrap gap-3 items-center">
              <a href="#programs">
                <Button className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-accent/80 hover:from-accent hover:via-accent/90 hover:to-accent/70 text-white rounded-full px-5 py-0 h-9 text-sm font-medium group transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-accent/30 hover:shadow-lg border border-accent/20">
                  <span className="relative z-10 flex items-center">
                    Register Now
                    <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Button>
              </a>

              <a href="#programs">
                <Button
                  variant="outline"
                  className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full px-5 py-0 h-9 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/40 group"
                >
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-1.5 w-3 h-3 text-secondary/80 group-hover:text-secondary transition-colors duration-300" />
                    Our Services
                    <span className="relative ml-1.5 w-3.5 h-3.5 overflow-hidden">
                      <ArrowRight className="absolute transform translate-x-0 group-hover:translate-x-8 transition-transform duration-300" />
                      <ArrowRight className="absolute transform -translate-x-8 group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                  </span>
                </Button>
              </a>
            </div>

            {/* Animated testimonial highlights - more compact */}
            <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 overflow-hidden relative h-12">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {[
                  {
                    text: "WeToo Media's guidance was a game-changer—helped me crack RCA with confidence.",
                    author: "Tauheed Siddiqui, RCA Selected",
                  },
                  {
                    text: "Immense gratitude to WeToo Media for providing the right direction and resources!",
                    author: "Rozi Parveen, RCA Selected",
                  },
                  {
                    text: "Thanks to WeToo Media’s interview guidance, I secured my dream selection!",
                    author: "Dawood Shaikh, RCA Selected",
                  },
                ].map((testimonial, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 h-12">
                    <CheckCircle className="text-secondary w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="text-white/90 text-xs">
                        {testimonial.text}
                      </p>
                      <p className="text-white/60 text-[10px]">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicator dots */}
              <div className="absolute bottom-1 right-2 flex gap-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "bg-secondary w-2" : "bg-white/30"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            className={`w-full lg:w-1/2 sm:mt-6 lg:mt-0 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-white/90 text-base md:text-[17px] leading-relaxed mb-6 max-w-xl">
              Our journey began with a passion for{" "}
              <span className="text-secondary font-medium">
                supporting underprivileged students
              </span>{" "}
              marginalized communities. Over the years, we have worked
              tirelessly to provide{" "}
              <span className="text-secondary font-medium">
                guidance, resources, and support
              </span>{" "}
              to help students gain admission to prestigious institutions and
              prepare for competitive exams like{" "}
              <span className="text-secondary font-medium">
                UPSC, SSC, NEET, and Judiciary examinations.
              </span>
            </p>

            {/* Compact statistics section with reduced height */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-secondary">{stat.icon}</div>
                    <span className="text-2xl sm:text-3xl font-bold flex items-center justify-center">
                      <CountUp
                        end={Number.parseInt(
                          stat.number.replace(/[^0-9]/g, "")
                        )}
                      />
                      <span className="text-secondary text-2xl">+</span>
                    </span>
                  </div>
                  <p className="text-xs text-center text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Animated skill tags - more compact */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                "RCA",
                "BPSC",
                "UPSC",
                "CIVIL SERVANT MATRIMONIAL",
                // "MORE"
              ].map((skill, idx) => (
                <a href="#programs">
                  <Button
                    key={idx}
                    className="relative overflow-hidden bg-gradient-to-br from-secondary px-5 sm:px-8 lg:px-9 via-secondary to-secondary/80 hover:from-secondary hover:via-secondary/90 hover:to-secondary/70 text-white rounded-full py-0 h-9 text-xs sm:text-sm  font-medium group transition-all duration-300 shadow-md shadow-secondary/20 hover:shadow-secondary/30 hover:shadow-lg border border-secondary/20"
                    style={{
                      transitionDelay: `${idx * 100}ms`,
                      animation: `fadeSlideIn 0.5s ease-out ${
                        idx * 100 + 600
                      }ms both`,
                    }}
                  >
                    {skill}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Team Image Section - Positioned to be partially visible */}
        <div
          ref={videoSectionRef}
          className={`relative w-full rounded-xl overflow-hidden shadow-2xl group transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } mt-4`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/30 rounded-full blur-xl z-0 animate-pulse"></div>
          <div
            className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/20 rounded-full blur-xl z-0 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <img
            src={hero}
            alt="Team collaboration"
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
          />

          {/* Sleeker Play Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg group-hover:shadow-secondary/30 z-10 group/play">
            <div className="relative">
              <Play className="w-5 h-5 ml-0.5 group-hover/play:scale-110 transition-transform" />
              <span className="absolute inset-0 rounded-full animate-ping bg-secondary/30 w-full h-full"></span>
            </div>

            {/* Ripple effect */}
            <span className="absolute inset-0 rounded-full animate-ripple opacity-0 group-hover/play:opacity-100 border-2 border-white/30"></span>
            <span
              className="absolute inset-0 rounded-full animate-ripple opacity-0 group-hover/play:opacity-100 border-2 border-white/30"
              style={{ animationDelay: "0.5s" }}
            ></span>
          </div>

          {/* Enhanced overlay gradient with animation */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>

          {/* Caption with animation */}
          {/* <div className="absolute bottom-0 left-0 w-full p-4 z-10 transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white/90 text-xs font-medium mb-1 transform group-hover:translate-x-2 transition-transform duration-500">
              Watch our showreel
            </p>
            <h3 className="text-white text-base md:text-lg font-bold transform group-hover:translate-x-2 transition-transform duration-500 delay-75">
              How we transform ideas into digital reality
            </h3>
          </div> */}

          {/* Scroll indicator */}
          <div className="absolute hidden sm:flex bottom-4 left-1/2 -translate-x-1/2 flex-col items-center animate-bounce opacity-80">
            <p className="text-white text-xs mb-1">Scroll to explore</p>
            <ChevronRight className="w-4 h-4 text-white transform rotate-90" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-ripple {
          animation: ripple 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Play } from "lucide-react";

// const Hero = () => {
//   return (
//     <section className="bg-primary text-white px-5 md:px-8 py-8 md:py-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Main Content - Responsive layout */}
//         <div className="flex flex-col lg:flex-row gap-5 md:gap-12 lg:gap-16 mb-12">
//           {/* Left Column */}
//           <div className="w-full lg:w-1/2">
//             <div className="mb-4 md:mb-6">
//               <p className="text-white/80 mb-1">Establish</p>
//               <p className="text-3xl md:text-4xl font-bold">2011</p>
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8">
//               We Are <span className="text-secondary">Creative</span>
//               <br className="hidden md:block" /> Digital Agency
//             </h1>
//           </div>

//           {/* Right Column */}
//           <div className="w-full lg:w-1/2">
//             <p className="text-white/90 text-lg leading-relaxed mb-8">
//               we are a creative agency with several services that focused on
//               quality and innovations for your business
//             </p>

//             {/* Stats - Responsive grid */}
//             <div className="grid grid-cols-3">
//               {[
//                 { number: "12", label: "Years of\nExperience" },
//                 { number: "83K", label: "Completed\nProject" },
//                 { number: "4.2K", label: "Trusted\nCompanies" }
//               ].map((stat, index) => (
//                 <div key={index} className="text-center border-x">
//                   <div className="flex items-center justify-center">
//                     <span className="text-2xl md:text-3xl font-bold">{stat.number}</span>
//                     <span className="text-secondary text-xl md:text-2xl font-bold">+</span>
//                   </div>
//                   <p className="text-xs md:text-sm text-white/70 mt-1">
//                     {stat.label.split('\n').map((line, i) => (
//                       <React.Fragment key={i}>
//                         {line}{i === 0 && <br />}
//                       </React.Fragment>
//                     ))}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Team Image Section */}
//         <div className="relative w-full rounded-xl overflow-hidden shadow-xl group">
//           <img
//             src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
//             alt="Team collaboration"
//             className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
//           />

//           {/* Play Button with hover effect */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
//             <Play className="w-5 h-5 md:w-6 md:h-6" />
//           </div>

//           {/* Overlay gradient */}
//           <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-70"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
